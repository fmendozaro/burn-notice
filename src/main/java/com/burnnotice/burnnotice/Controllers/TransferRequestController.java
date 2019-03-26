package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.*;
import com.burnnotice.burnnotice.Repositories.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import com.sendgrid.*;


@RestController
public class TransferRequestController {

    private final TransferRequestRepository transferDao;
    private final UserRepository userDao;
    private final VacancyRepository vacDao;
    private final FireStationRepository stationDao;
    private final AssignmentRepository assignmentDao;

    public TransferRequestController(TransferRequestRepository transferDao, UserRepository userDao, VacancyRepository vacDao, FireStationRepository stationDao, AssignmentRepository assignmentDao) {
        this.userDao = userDao;
        this.stationDao = stationDao;
        this.vacDao = vacDao;
        this.transferDao = transferDao;
        this.assignmentDao = assignmentDao;
    }

    @GetMapping("/api/user-transfer-req")
    public List<TransferReqHighlights> findTransferByStation(@RequestParam long id) {
        return transferDao.findAllByUserId(id);
    }

    @PostMapping("/api/submitApplication")
    public void submitApplication(@RequestBody TransferRequest transferRequest) {
        transferDao.save(transferRequest);

        // sets transfer eligibility to false while review is pending
        User applicant = userDao.findOne(transferRequest.getUser().getId());
        applicant.setEligibleForTransfer(false);
        userDao.save(applicant);
    }

    @GetMapping("/api/findTransferByStation")
    public List<TransferReqHighlights> findAllByStation(@RequestParam String stationName) {
        System.out.println(stationName);
        return transferDao.findAllByVacancy_Station_NameAndStatusContains(stationName, "Pending");
    }

    @GetMapping("/api/one-transfer")
    public TransferRequest findOne(@RequestParam long id){
        return transferDao.findOne(id);
    }

    @Value("{$sendgrid_api_key}") String sendGridAPIKey;
    @PostMapping("/api/approve-transfer")
    public void approveRequest( @RequestBody TransferRequest request) throws IOException {
        // notify user by email
        User applicant = userDao.findOne(request.getUser().getId());

        Email from = new Email("info@burn-notice.com");
        String subject = "Transfer Request Approved!";
        Email to = new Email(applicant.getEmail());
        Content content = new Content("text/html", "<h1>You have been approved!<h1><br>" + applicant.getFirstName() + applicant.getLastName() + " has been approved for transfer to station" + request.getVacancy().getStation().getName());
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendGridAPIKey);
        Request newRequest = new Request();
        try {
            newRequest.setMethod(Method.POST);
            newRequest.setEndpoint("mail/send");
            newRequest.setBody(mail.build());
            Response response = sg.api(newRequest);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }


        // close vacancy
        Vacancy vacancy = vacDao.findOne(request.getVacancy().getId());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        vacancy.setFillDate(dateFormat.format(new Date()));
        vacDao.save(vacancy);


        // end most current assignment with the start date of the vacancy
        Assignment currentAssignment = assignmentDao.findByEndDateAndUserId("9999", applicant.getId());
        System.out.println(currentAssignment.getEndDate());
        currentAssignment.setEndDate(vacancy.getPostDate());
        assignmentDao.save(currentAssignment);

        // populate assignment history with start date of assignment the same as vacancy start
        FireStation station = stationDao.findOne(vacancy.getStation().getId());
        Assignment newAssignment =
                new Assignment(vacancy.getPostDate(), "9999", vacancy.isEngine(), station, applicant);
        assignmentDao.save(newAssignment);

        // set all other applications for the vacancy to "Filled"
        List<TransferRequest> applications = transferDao.findAllByVacancyId(vacancy.getId());
        for (TransferRequest application: applications){
            application.setStatus("Filled");
        }
        transferDao.save(applications);


        // set status to approved
        TransferRequest transferRequest = transferDao.findOne(request.getId());
        transferRequest.setStatus("Approved");
        transferDao.save(transferRequest);

        // Set every pending user's eligibility for transfer back to true


        // Add an association between the successful applicant and the accepting fire station


    }

    @PostMapping("/api/deny-transfer")
    public void denyRequest(@RequestBody TransferRequest request) {
        // set eligibility to true
        User applicant = userDao.findOne(request.getUser().getId());
        applicant.setEligibleForTransfer(true);
        userDao.save(applicant);

        // notify user somehow


        // set status to denied
        TransferRequest transferRequest = transferDao.findOne(request.getId());
        transferRequest.setStatus("Denied");
        transferDao.save(transferRequest);
    }

}