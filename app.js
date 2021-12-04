export default (express, bodyParser, createReadStream, crypto, http, MongoClient, puppeteer, axios) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader('charset', 'utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
        next();
    });

    app.get('/login/', (req, res) => {
        res.send('vasillesha55');
    });

    app.get('/wordpress/', async (req, res, next) => {
        const content = req.query.content;
        const response = await axios.post(
            'https://wordpress.kodaktor.ru/wp-json/jwt-auth/v1/token',
            { username: 'gossjsstudent2017', password: '|||123|||456' },
        );
        const token = response.data.token;

        const wordpressResponse = await axios.post(
            'https://wordpress.kodaktor.ru/wp-json/wp/v2/posts',
            { content, title: 'Vasilchenko Alexey from heroku', status: 'publish' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        res.send(wordpressResponse.data.id + '');
    });

    app.get('/test/', async (req, res, next) => {
        const url = req.query.URL;
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector('#bt');
        await page.click('#bt');
        await page.waitForSelector('#inp');

        const value = await page.$eval('#inp', el => el.value);
        browser.close();
        res.send(value);
    });

    app.all('*', (req, res, next) => {
        res.send('vasillesha55');
        next();
    });

    return app;
}
