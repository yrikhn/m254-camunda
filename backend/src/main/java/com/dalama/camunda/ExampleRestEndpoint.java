package com.dalama.camunda;

import org.camunda.community.rest.client.api.ProcessDefinitionApi;
import org.camunda.community.rest.client.dto.*;
import org.camunda.community.rest.client.invoker.ApiException;
import org.camunda.community.rest.client.springboot.CamundaHistoryApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import java.util.*;

@RestController
public class ExampleRestEndpoint {

    @Autowired
    private ProcessDefinitionApi processDefinitionApi;

    @Autowired
    private CamundaHistoryApi camundaHistoryApi;

    @PutMapping("/start")
    public ResponseEntity<String> startProcess(ServerWebExchange exchange) throws ApiException {
        // TODO: Get from REST request / URL parameter
        String userProcessVariable = "admin";
        int bookProcessVariable = 1;

        // prepare variables to pass on to process
        Map<String, VariableValueDto> variables = new HashMap<>();
        variables.put(
                ProcessConstants.VAR_NAME_USER,
                new VariableValueDto().value(userProcessVariable).type("string"));
        variables.put(
                ProcessConstants.VAR_NAME_BOOK,
                new VariableValueDto().value(bookProcessVariable).type("string"));

        // start process instance
        ProcessInstanceWithVariablesDto processInstance = processDefinitionApi.startProcessInstanceByKey(
                ProcessConstants.PROCESS_KEY_BORROW_BOOK,
                new StartProcessInstanceDto().variables(variables));

        System.out.println("Started process instance with id: " + processInstance.getId());

        // And just return something for the sake of the example
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Started process instance with id: " + processInstance.getId());
    }

    @GetMapping("/info")
    public ResponseEntity<List<HistoricProcessInstanceDto>> getActiveProcessInstances() throws ApiException {
        List<HistoricProcessInstanceDto> processInstances = camundaHistoryApi.historicProcessInstanceApi().queryHistoricProcessInstances(
                null,
                null,
                new HistoricProcessInstanceQueryDto().active(true));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(processInstances);

    }

}
