import express from 'express';
import appBuilder from './app.js';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';
import crypto from 'crypto';
import http from 'http';
import puppeteer from 'puppeteer';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const port = process.env.PORT || 3000;
const app = appBuilder(express, bodyParser, createReadStream, crypto, http, MongoClient, puppeteer, axios);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
