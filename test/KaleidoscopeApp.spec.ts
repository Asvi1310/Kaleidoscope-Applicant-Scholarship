import { test, expect, Page } from '@playwright/test';

test.describe('Kaleidoscope Applicant Application process', () => {

  // Note: Keep changing only email address in case of running the script multiple times
  let emailAddress: string = "ashish1991@gmail.com";
  let firstName: string = "Ashish";
  let lastName: string = "Kumar";
  let country: string = "India+";
  let Password: string = "Applicatio@145";
  let streetAdr: string = "6708 Stella Pl";
  let state: string = "Alaska";
  let city: string = "Anchorage";
  let zipCode: string = "62621";
  let schoolName: string = "Symbiosis High School";
  let schoolAdr: string = "street 123 lane 12";
  let highSchZipCode: string = "123456";
  let year: string = "2024";
  let animalEssay: string = "Animals are multicellular organisms that inhabit diverse ecosystems across the Earth";
  let schoolsEssay: string = "Schools are institutions where students receive education";


  test.beforeEach(async ({ page }) => {
    await page.goto('https://apply.mykaleidoscope.com/program/sdet-test-scholarship');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Kaleidoscope Applicant Application process', async ({ page }) => {
    await loginToApply(page, emailAddress);
    await fillSignUpDetails(page, firstName, lastName, country, Password);
    await fillAddressDetails(page, streetAdr, state, city, zipCode);
    await addExtracurricularActivities(page);
    await highSchoolInformation(page, schoolName, schoolAdr, city, state, highSchZipCode, year);
    await essay(page, animalEssay, schoolsEssay);
    await reviewApplicationPage_LetsGetToKnowYou(page, firstName, lastName, emailAddress, streetAdr, state, city, zipCode);
    await submitApplciation(page);
    await validateEditingNOtAllowed(page);

  });
});

async function loginToApply(page: Page, emailAddress: string) {
  expect(page.getByRole('link', { name: 'Log In to Apply' })).toBeVisible();
  expect(page.getByRole('link', { name: 'Log In to Apply' })).toBeEnabled();
  await page.getByRole('link', { name: 'Log In to Apply' }).click();
  await page.waitForLoadState('domcontentloaded');
  expect(page.getByPlaceholder('Email Address')).toBeVisible();
  await page.getByPlaceholder('Email Address').clear();
  await page.getByPlaceholder('Email Address').fill(emailAddress);
  await page.waitForTimeout(2000);
  await page.locator('button[id="login-page__cta"]').click();
}

async function fillSignUpDetails(page: Page, firstName: string, lastName: string, country: string, Password: string) {
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill(firstName);
  await page.getByLabel('Last Name').click();
  await page.getByLabel('Last Name').fill(lastName);
  await page.getByRole('button', { name: 'United States: +' }).click();
  await page.getByRole('option', { name: country }).click();
  await page.locator('input[class="H6DesktopBlack field__tel-field"]').fill('12345-67890');
  await page.getByLabel('Create a Password').click();
  await page.getByLabel('Create a Password').fill(Password);
  await page.getByLabel('I confirm that I am at least').check();
  await page.waitForTimeout(5000);
  await page.locator('//button[@id="onboarding-screen__form-submit"]').click();
  await page.waitForTimeout(5000);
  await page.locator('//h2[text()="Lets get to know you!"]').waitFor({ state: 'visible' });
  await page.waitForLoadState('domcontentloaded');
}

async function fillAddressDetails(page: Page, streetAdr: string, state: string, city: string, zipCode: string) {
  await page.locator('//h2[text()="Lets get to know you!"]').isVisible();
  await page.getByPlaceholder('Enter your street address').click();
  await page.getByPlaceholder('Enter your street address').fill(streetAdr);
  await page.getByPlaceholder('Enter your state').click();
  await page.getByText(state).click();
  await page.getByPlaceholder('Enter your city').click();
  await page.getByPlaceholder('Enter your city').fill(city);
  await page.getByPlaceholder('Enter your zip code').click();
  await page.getByPlaceholder('Enter your zip code').fill(zipCode);
  await page.getByPlaceholder('Enter your country').click();
  await page.getByRole('option', { name: 'Angola' }).click();
  await page.locator('//button[@type="submit"]').isVisible();
  await page.locator('//button[@type="submit"]').isEnabled();
  await page.locator('//button[@type="submit"]').click({ force: true });
  await page.waitForLoadState('domcontentloaded');
}

async function addExtracurricularActivities(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//h2[text()="Extracurricular Activities"]').isVisible();
  await page.locator('//button[@type="submit"]').click(); // click on Next page without adding activities
  // Validate Error message
  let addActivityErrorMsg = await page.locator(' //*[text()="Please add at least 2 entries"]').isVisible();
  expect(addActivityErrorMsg).toBe(true);
  //Add four activities
  const activities: any[] = ['sports', 'Music', 'Speech', 'Dance'];
  for (let i = 0; i < activities.length; i++) {
    await page.getByRole('button', { name: 'Add Entry', exact: true }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Add Entry', exact: true }).click();
    await page.getByPlaceholder('Short Input').waitFor({ state: 'visible' });
    await page.getByPlaceholder('Short Input').click();
    await page.getByPlaceholder('Short Input').fill(activities[i]);
    await page.getByPlaceholder('123').click();
    await page.getByPlaceholder('123').fill('2');
    await page.locator('.m_8fb7ebe7.mantine-Input-input.mantine-Textarea-input').nth(0).click();
    await page.locator('.m_8fb7ebe7.mantine-Input-input.mantine-Textarea-input').nth(0).fill('Player');
    await page.locator('.m_8fb7ebe7.mantine-Input-input.mantine-Textarea-input').nth(1).click();
    await page.locator('.m_8fb7ebe7.mantine-Input-input.mantine-Textarea-input').nth(1).fill('captain');
    await page.locator('.mantine-focus-auto.mantine-active.m_77c9d27d.mantine-Button-root.m_87cf2631.mantine-UnstyledButton-root').nth(6).click();
    await page.waitForTimeout(5000);
    await page.locator('//button//span[contains(text(),"Save")]').click();
  }
  await page.locator('//button[@type="submit"]').isVisible();
  await page.locator('//button[@type="submit"]').isEnabled();
  await page.locator('//button[@type="submit"]').click({ force: true });
  await page.waitForLoadState('domcontentloaded');
}

async function highSchoolInformation(page: Page, schoolName: string, schoolAdr: string, city: string, state: string, highSchZipCode: string, year: string) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
  await page.getByPlaceholder('Please enter the name of your current High School').click();
  await page.getByPlaceholder('Please enter the name of your current High School').fill(schoolName);
  await page.getByPlaceholder('Enter high school street address').click();
  await page.getByPlaceholder('Enter high school street address').fill(schoolAdr);
  await page.getByPlaceholder("Enter high school city").click();
  await page.getByPlaceholder("Enter high school city").fill(city);
  await page.getByPlaceholder('Enter high school state').click();
  await page.getByText(state).click();
  await page.getByPlaceholder('e.g. 55413').click();
  await page.getByPlaceholder('e.g. 55413').fill(highSchZipCode);
  await page.getByPlaceholder('Enter your current GPA').click();
  await page.getByPlaceholder('Enter your current GPA').fill('99');
  await page.getByPlaceholder('Enter a date').click();
  await page.getByPlaceholder('Enter a date').fill(year);
  await page.locator('input[type="file"]').setInputFiles('C:/Kaleidoscope Applicant Application/UploadFiles/MySchoolTranscript.pdf');
  await page.waitForTimeout(10000);
  await page.waitForLoadState('domcontentloaded');
  await page.locator('//button[@type="submit"]').click();
  await page.waitForLoadState('domcontentloaded');
}

async function essay(page: Page, animalEssay: string, schoolsEssay: string) {
  //validate checkbox and textbox
  await page.locator('//label[text()="Cars"]').click();
  await page.locator('//label[text()="Essay about Cars"]').waitFor();
  await page.locator('//label[text()="Essay about Cars"]').isVisible();
  await page.locator('//label[text()="Animals"]').click();
  await page.locator('//label[text()="Essay about Animals"]').waitFor();
  await page.locator('//label[text()="Essay about Animals"]').isVisible();
  await page.locator('//label[text()="School"]').click();
  await page.locator('//label[text()="Essay about School"]').waitFor();
  await page.locator('//label[text()="Essay about School"]').isVisible();
  await page.locator('//label[text()="Other"]').click();
  await page.locator('//label[text()="Provide an essay about any topic"]').waitFor();
  await page.locator('//label[text()="Provide an essay about any topic"]').isVisible();
  // uncheck two options and select remaining two options
  await page.waitForTimeout(3000);
  await page.locator('//label[text()="Cars"]').click();
  await page.locator('//label[text()="Other"]').click();
  await page.waitForTimeout(3000);
  await page.locator('textarea[name="3kQsIdx5-JQCId_AOoSOB"]').click(); //Animals essay textbox
  await page.locator('textarea[name="3kQsIdx5-JQCId_AOoSOB"]').fill(animalEssay);
  await page.locator('textarea[name="oSl-QCyps8HnGHKUtIFw3"]').click(); //Schools essay textbox
  await page.locator('textarea[name="oSl-QCyps8HnGHKUtIFw3"]').fill(schoolsEssay);
  await page.waitForTimeout(3000);
  await page.locator('//button[@type="submit"]').click();
  await page.waitForLoadState('domcontentloaded');
}

async function reviewApplicationPage_LetsGetToKnowYou(page: Page, firstName: string, lastName: string, emailAddress: string, streetAdr: string, state: string, city: string, zipCode: string) {
  await page.locator('//p[text()="Review Your Application"]').waitFor();
  await page.locator('//p[text()="Review Your Application"]').isVisible();
  await page.locator('//span[text()="Lets get to know you!"]').click();
  const fName = await page.locator(`//p//span[text()="${firstName}"]`).innerText();
  expect(fName).toBe(firstName);
  const lName = await page.locator(`//p//span[text()="${lastName}"]`).innerText();
  expect(lName).toBe(lastName);
  const e_mailAddress = await page.locator(`//p[text()="${emailAddress}"]`).innerText();
  expect(e_mailAddress).toBe(emailAddress);
  const street_Adr = await page.locator(`//p//span[text()="${streetAdr}"]`).innerText();
  expect(street_Adr).toBe(streetAdr);
  const stateTxt = await page.locator(`(//p[text()="${state}"])[1]`).innerText();
  expect(stateTxt).toBe(state);
  const cityTxt = await page.locator(`(//p//span[text()="${city}"])[1]`).innerText();
  expect(cityTxt).toBe(city);
  const zipCodeTxt = await page.locator(`(//p//span[text()="${zipCode}"])[1]`).innerText();
  expect(zipCodeTxt).toBe(zipCode);
  await page.waitForTimeout(4000);
}

async function submitApplciation(page: Page) {
  await page.locator('//p[text()="Submit"]').click();
  await page.waitForTimeout(15000);
  const submitApplicationUrl = page.url();
  console.log(submitApplicationUrl);
}

async function validateEditingNOtAllowed(page: Page) {
  await page.getByLabel('View Application').click();
  await page.waitForTimeout(4000);
  await page.locator('(//span[text()="Edit"])[1]').isHidden();
}

