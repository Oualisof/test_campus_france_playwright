import { Page } from "@playwright/test";

export class RegisterPage {
  page :Page;
  constructor( page :Page) {
    this.page = page;
  }
    static profileIdMap = {
    "Étudiants": "#edit-field-publics-cibles-2",
    // ajoute d'autres profils si besoin
  };

  async fillEmail(email) {
    await this.page.getByRole('textbox', { name: /adresse.*domaine\.com/i }).fill(email);
  }

  async fillPassword(password) {
    // Utilise getByLabel pour cibler les champs de mot de passe
    await this.page.getByRole('textbox', { name: 'Mon mot de passe*' }).fill(password);
    await this.page.getByRole('textbox', { name: 'Confirmer le mot de passe*' }).fill(password);
  }

  async selectCivility(civility) {
    // SPlectionne la civilité (Monsieur/Madame/etc.)
    await this.page.getByText(civility, { exact: true }).click();
  }

  async fillName(lastName, firstName) {
    await this.page.getByRole('textbox', { name: 'Nom*', exact: true }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Prénom*', exact: true }).fill(firstName);
  }

async selectCountry(nationality) {
  // Ouvre la liste déroulante
  await this.page.locator('div').filter({ hasText: /^- Choisir une valeur -$/ }).first().click();

  // Trouve l’option par son texte, attends qu’elle soit visible
  const option = this.page.getByText(nationality, { exact: false });
  await option.waitFor({ state: 'visible', timeout: 5000 });

  // Clique sur la première option visible
  await option.first().click();
}


  async fillAddress(postalCode, city, phone) {
    await this.page.getByRole('textbox', { name: 'Code postal' }).fill(postalCode);
    await this.page.getByRole('textbox', { name: 'Ville' }).fill(city);
    await this.page.getByRole('textbox', { name: 'Téléphone' }).fill(phone);
  }

async selectStudentProfile(profileName) {
  await this.page.locator('#edit-field-publics-cibles').getByText(profileName).click();
}

  async selectFieldAndLevel(field, level) {
    await this.page.locator('#edit-field-domaine-etudes-wrapper div').filter({ hasText: '- Aucun(e) -' }).nth(2).click();
    await this.page.getByText(field, { exact: false }).click();
    await this.page.locator('#edit-field-niveaux-etude-wrapper div').filter({ hasText: '- Aucun(e) -' }).nth(2).click();
    await this.page.getByText(level, { exact: false }).click();
  }

  async acceptConditions() {
    await this.page.getByText("J’accepte que mes données", { exact: false }).click();
  }

  async submitForm() {
    await this.page.getByRole('button', { name: /créer un compte/i }).click();
  }
}

module.exports = { RegisterPage };