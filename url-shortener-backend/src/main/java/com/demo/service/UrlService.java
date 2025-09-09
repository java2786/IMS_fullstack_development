package com.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Random;
import java.util.UUID;

import com.demo.dto.ShortenRequest;
import com.demo.dto.ShortenResponse;
import com.demo.entity.UrlMapping;
import com.demo.exception.NotFoundException;
import com.demo.repository.UrlMappingRepository;

import com.demo.util.Base62;

@Service
public class UrlService {

    private static final String BASE_URL = "http://localhost:8080/"; // concrete for local use

    @Autowired
    private UrlMappingRepository repository;

    public ShortenResponse shorten(ShortenRequest req) {
        UrlMapping urlEntity = new UrlMapping(Base62.randomCode(5), req.getOriginalUrl());
        UrlMapping saved = repository.save(urlEntity);
        String code = saved.getShortCode();
        // abc 
        // localhost:8080/abc
        String shortUrl = BASE_URL + code;
        return new ShortenResponse(code, shortUrl, req.getOriginalUrl());
    }


}