package com.dalama.camunda;

import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.client.RestTemplate;

import java.util.logging.Logger;

@Configuration
@ExternalTaskSubscription("send-reminder-mail")
public class SendReminderMailWorker implements ExternalTaskHandler {

    private final static Logger LOGGER = Logger.getLogger(SendReminderMailWorker.class.getName());

    @Autowired
    private JavaMailSender emailSender;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        System.out.println("Hello from SendReminderMailWorker");

        int bookId = externalTask.getVariable("bookId");
        String userId = (String) externalTask.getVariable("userId");

        System.out.println("Variables set");
        System.out.println(frontendUrl + "/api/book/" + bookId);

        Book book = restTemplate.getForObject(frontendUrl + "/api/book/" + bookId, Book.class);
        if (book == null) {
            LOGGER.warning("Book with id " + bookId + " not found");
            externalTaskService.handleFailure(externalTask, "Book not found", "Book not found", 0, 0);
            return;
        }

        SimpleMailMessage message = getMailMessage(book);
        //emailSender.send(message);

        // Complete the task
        externalTaskService.complete(externalTask);
    }

    @NotNull
    private static SimpleMailMessage getMailMessage(Book book) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("davide@marcoli.ch");
        message.setTo("davide@marcoli.ch"/*, "orangesushi494@gmail.com"*//*, "davide.marcoli13@gmail.com"*/);
        message.setSubject("Reminder: Book " + book.title() + " is due soon");
        message.setText("Dear Bookworm,\n\n" +
                "You have borrowed the book \"" + book.title() + "\" by " + book.author() + ".\n" +
                "Please return it soon.\n\n" +
                "Best regards,\n" +
                "Your Library");
        return message;
    }

}
