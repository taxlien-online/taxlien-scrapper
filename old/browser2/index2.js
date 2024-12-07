import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

// Константы для настройки скрипта
const URL = 'https://columbia.floridapa.com/gis/?pin=142S1500061000';
//const SELECTOR = '#ownerDiv > table:first-child > tbody > tr:first-child > td > table > tbody > tr:first-child > td:nth-child(3)';
const IFRAME_SELECTOR = '#recordSearchContent_1_iframe';
const SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(3) > b';
const TEXT_XPATH='/html/body/table/tbody/tr/td/div/table/tbody/tr[2]/td/table/tbody/tr[1]/td/div/div[2]/table[1]/tbody/tr[1]/td/table/tbody/tr[1]/td[3]/b';

//const BUTTON_SELECTOR = '#ownerDiv > table:first-child > tbody > tr:first-child > td > table > tbody > tr:first-child > td:nth-child(4) > a > input';
const BUTTON_SELECTOR = '#ownerDiv > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(4) > a > input';

const WAIT_OPTION = { waitUntil: 'networkidle0'};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {
  const browser = await puppeteer.launch({headless: false });
  const page1 = await browser.newPage();
  const page = await browser.newPage();

  // Открытие страницы
  await page1.goto(URL, WAIT_OPTION);
  await sleep(1000);
  await page.goto(URL, WAIT_OPTION);
  await sleep(1000);
  await page.waitForSelector(IFRAME_SELECTOR);
  const frameHandle = await page.$(IFRAME_SELECTOR);
  const frame = await frameHandle.contentFrame();
  console.log(frame);
  
  // Цикл, который продолжается, пока можно переключаться на следующую запись
  let active = true;
  let counter = 0;

  while (active) {
    try {
      // Получение текста из заданного элемента
/*
*/


	console.log("loaded");
    await sleep(2000);


      const text1 = await frame.evaluate((selector) => {
        const element = document.querySelector(selector);
        return element ? element.innerText : null;
      }, SELECTOR);

      const elements = await frame.$x(TEXT_XPATH);
    console.log(page);
    console.log(elements);
      const text = elements.length > 0 ? await (await elements[0].getProperty('innerText')).jsonValue() : null;

	console.log(text);
	console.log(text1);
	
      if (text) {
	  const htmlContent = await frame.evaluate(() => document.documentElement.outerHTML);

        // Сохранение текста в файл
        writeFileSync(`res/${text}.txt`, htmlContent);
        counter++;
      } else {
        // Если текста нет, предположим, что записей больше нет
        active = false;
      }

    await sleep(5000);
/*
	// Клик по кнопке для перехода на следующую запись
	console.log("click");
      await Promise.all([
        frame.waitForNavigation(WAIT_OPTION),
        frame.click(BUTTON_SELECTOR)
      ]);

*/
      // Выполнение JavaScript для перехода на следующую запись
      await frame.evaluate(() => {
        NextRowID(+1);
      });

	console.log("clicked");
      
      
      

      // Ожидание, чтобы страница снова загрузилась полностью
      await page.waitForNavigation(WAIT_OPTION);

    } catch (error) {
      // Если произошла ошибка, остановить цикл
      console.error('Произошла ошибка: ', error);
      active = false;
    }
  }

  await browser.close();
})();
