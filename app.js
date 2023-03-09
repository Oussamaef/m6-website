const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const codeMassar = document.querySelector('#codeInput').value;

  // Get the data from the sheet
  fetch('data.xlsx')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Find the row with the matching code Massar
      const row = data.find(row => row['Code Massar'] === codeMassar);

      // Populate the form fields
      if (row) {
        document.querySelector('#nameInput').value = row['Nom Prénom'];
        document.querySelector('#emailInput').value = row['Adresse e-mail'];
        document.querySelector('#bacInput').value = row['Type de Bac'];
        document.querySelector('#noteInput').value = row['Moyenne générale du Bac'];
        document.querySelector('#phoneInput').value = row['Téléphone'];
        document.querySelector('#submitButton').classList.remove('disabled');
      } else {
        alert('Code Massar invalide');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Erreur de chargement des données');
    });
});
