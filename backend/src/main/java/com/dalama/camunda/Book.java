package com.dalama.camunda;

import java.util.Date;

public record Book(int id, String title, Date createdAt, String content, String author) {
}
