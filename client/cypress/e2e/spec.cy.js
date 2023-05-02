describe('ChatGPT API', () => {
  it('shows output of chatgpt api', () => {
    cy.visit('http://localhost:3000')
    cy.get('button').contains(" Create a soundbite ").click()
    cy.get('input[type=file]').invoke('show').selectFile('../audio77.flac')
    
    cy.get('button').contains("Generate SoundBite").click()
    cy.wait(15000)
    cy.contains("Edit Soundbite", { matchCase: false });
  });
});