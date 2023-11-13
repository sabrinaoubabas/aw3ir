function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

window.onload = function () {

    displayContactList();

    //document.getElementById("MyForm").reset();
    console.log("DOM ready!");
    // Fonction pour ajouter un contact à la liste
    function addContactToPage(contact) {
        var ul = document.getElementById('contact-list');
        var li = document.createElement('li');
        li.innerHTML = `<b>${contact.firstname} ${contact.name}</b><br>
                        Date de Naissance: ${contact.birthday}<br>
                        Adresse: ${contact.address}<br>
                        Email: ${contact.email}`;
        ul.appendChild(li);
    }

    // Récupérer le formulaire et le champ texte
    const formulaire = document.getElementById("monFormulaire");

    const champNom = document.getElementById("name");
    const champPrenom = document.getElementById("firstname");
    const champDate = document.getElementById("birthday");
    const champAdresse = document.getElementById("address");
    const champEmail = document.getElementById("email");

    //const messageErreur = document.getElementById("messageErreur");
    var modalBodyError = document.querySelector(".modal-body");
    var modalBodyGlobalError = document.querySelector(".modal-body2");
    var modalTitleDisplay = document.querySelector(".modal-title3");
    var modalBodyDisplay = document.querySelector(".modal-body3");

    // Fonction de validation
    function validerFormulaire(event) {
        // Empêcher la soumission par défaut
        event.preventDefault();

        // Vérifier la longueur du champ texte
        var Total = "";
        var ErrorNom = "";
        var ErrorPrenom = "";
        var ErrorAdresse = "";
        var DateVide = "";
        var ErrorDate = "";
        var ErrorMail = "";
        var ErrorGlobal = "";
        //champs date 
        const birthday = champDate.value
        const birthdayDate = new Date(birthday);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (champNom.value === "" && champPrenom.value === "" && champAdresse.value === "" && champEmail.value === "" && champDate.value === "") {
            ErrorGlobal = "Tous les champs sont obligatoires";
            modalBodyGlobalError.textContent = ErrorGlobal;
            var myModal_GlobalError = new bootstrap.Modal(document.getElementById('myModal2'));
            myModal_GlobalError.show();
        } else if (ErrorGlobal === "") {

            if (champNom.value.length < 5) ErrorNom = "Nom doit avoir au moins 5 caractères <br>";
            if (champPrenom.value.length < 5) ErrorPrenom = "Prénom doit avoir au moins 5 caractères <br>";
            if (champAdresse.value.length < 5) ErrorAdresse = "Adresse doit avoir au moins 5 caractères <br>";
            if (champDate.value === "") DateVide = "La date de naissance est obligatoire <br>";
            if (birthdayTimestamp > nowTimestamp) ErrorDate = "La date de naissance n'est pas encore venu <br>";

            if (champEmail.value === "") ErrorMail = "L'Email est obligatoire <br>";
            else if (!validateEmail(champEmail.value)) ErrorMail = "l'email n'est pas valide <br>";

            Total = ErrorNom + ErrorPrenom + DateVide + ErrorDate + ErrorAdresse + ErrorMail;

            if (Total !== "") {
                modalBodyError.innerHTML = Total;
                var myModal_Error = new bootstrap.Modal(document.getElementById('myModal'));
                myModal_Error.show();
            } else {
                const message = document.getElementById('message');
                message.textContent = "Bravo ! le formulaire est sauvgarder";
                message.style.display = 'block';
                contactStore.add(champNom.value, champPrenom.value, champDate.value, champAdresse.value, champEmail.value);
                displayContactList();
            }
        }
    }


    // Écouter l'événement "submit" du formulaire
    formulaire.addEventListener("submit", validerFormulaire);

    document.getElementById('mapButton').addEventListener('click', function () {
        getLocation();
    });

};

function calcNbChar(id) {

    const input = document.getElementById(id);
    const span = document.getElementById(`span-${id}`);
    span.textContent = input.value.length + "car.";
}

function displayContactList() {
    const contactListString = localStorage.getItem('contactList');
    const contactList = contactListString ? JSON.parse(contactListString) : [];

    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = ''; // Efface le contenu précédent pour éviter les doublons

    for (const contact of contactList) {
        tbody.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.firstname}</td>
                <td>${contact.date}</td>
                <td>${contact.adress}</td>
                <td>${contact.mail}</td>
            </tr>
        `;
    }

    document.getElementById('contactCounter').textContent = `Liste des contacts (${contactList.length})`;
}



function resetForm() {

    contactStore.reset();
    displayContactList();
}


