package com.dalama.camunda;

import java.util.Date;

public record Session(User user, String expires) {
}
