import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import users from '../data/user.json';

test.describe('Plan de test inscription Campus France', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto('https://www.campusfrance.org/fr/user/register');
  });

  test('Remplir le formulaire pour le profil Étudiants', async ({ page }) => {
    const userData = users[0];
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.selectCivility(userData.civility);
    await registerPage.fillName(userData.lastName, userData.firstName);
    await registerPage.selectCountry(userData.nationality);
    await registerPage.fillAddress(userData.postalCode, userData.city, userData.phone);
    await registerPage.selectStudentProfile(userData.profilName);
    await registerPage.selectFieldAndLevel(userData.field, userData.level);
    await registerPage.acceptConditions();
    await registerPage.submitForm();
    // Optionnel : vérification d'un texte ou d'une redirection de succès
    // await expect(page.getByText(/inscription réussie/i)).toBeVisible();
  });

  test('Remplir le formulaire pour le profil Chercheurs', async ({ page }) => {
    const userData = users[1];
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.selectCivility(userData.civility);
    await registerPage.fillName(userData.lastName, userData.firstName);
    await registerPage.selectCountry(userData.nationality);
    await registerPage.fillAddress(userData.postalCode, userData.city, userData.phone);
    await registerPage.selectStudentProfile(userData.profilName);
    await registerPage.selectFieldAndLevel(userData.field, userData.level);
    await registerPage.acceptConditions();
    await registerPage.submitForm();
    // Optionnel : vérification d'un texte ou d'une redirection de succès
    // await expect(page.getByText(/inscription réussie/i)).toBeVisible();
  });
});