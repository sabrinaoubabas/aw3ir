var app;
window.onload = function () {
    app = new Vue({

        el: '#weatherApp', // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
        data: {
            // sera utilisé comme indicateur de chargement de l'application
            loaded: false,

            // cityName, variable utilisé dans le formulaire via v-model
            formCityName: '',

            message: 'WebApp Loaded.',
            messageForm: '',

            // liste des villes saisies, initialiser avec Paris
            cityList: [{
                name: 'Alger'
            }],

            // cityWeather contiendra les données météo reçus par openWeatherMap
            cityWeather: null,

            // indicateur de chargement
            cityWeatherLoading: false
        },

        // 'mounted' est exécuté une fois l'application VUE totalement disponible
        // Plus d'info. sur le cycle de vie d'une app VUE : 
        // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        mounted: function () {
            this.loaded = true;
            this.readData();
        },

        // ici, on définit les methodes qui vont traiter les données décrites dans DATA
        methods: {
            readData: function (event) {
                console.log('JSON.stringify(this.cityList)', JSON.stringify(this.cityList)); // va afficher la liste des villes
                // JSON.stringify permet transfomer une liste en chaine de caractère

                console.log('this.loaded:', this.loaded); // va afficher 'this.loaded: true'
            },
            /*isCityExist: function (cityName) {
                for (var i = 0; i < this.cityList.length; i++) {
                    if (this.cityList[i].name.toLowerCase() === cityName.toLowerCase()) {
                        return true;
                    }
                }
                return false;
            },*/
            isCityExist: function (_cityName) {

                // la méthode 'filter' retourne une liste contenant tous les items ayant un nom égale à _cityName
                if (this.cityList.filter(item =>
                    item.name.toUpperCase() == _cityName.toUpperCase()
                ).length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            addCity: function (event) {
                event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire

                console.log('formCityName:', this.formCityName);
                // A compléter dans la suite du TP  

                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = 'La ville {' + this.formCityName + '} existe déjà';
                } else {
                    this.cityList.push({ name: this.formCityName });

                    // remise à zero du message affiché sous le formulaire
                    this.messageForm = '';

                    // remise à zero du champ de saisie
                    this.formCityName = '';
                }

                this.readData();
            },
            remove: function (_city) {
                // on utilise 'filter' pour retourne une liste avec tous les items ayant un nom différent de _city.name
                this.cityList = this.cityList.filter(item => item.name != _city.name);
                this.readData();
            },
            meteo: function (_city) {

                this.cityWeatherLoading = true;

                // appel AJAX avec fetch
                fetch('https://api.openweathermap.org/data/2.5/weather?q=' + _city.name + '&units=metric&lang=fr&apikey=8bd0c4cec6f983b4e2fd0c00feec9dba')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        app.cityWeatherLoading = false;

                        // test du code retour
                        // 200 = OK
                        // 404 = city not found 
                        if (json.cod === 200) {
                            // on met la réponse du webservice dans la variable cityWeather
                            app.cityWeather = json;
                            app.message = null;
                        } else {
                            app.cityWeather = null;
                            app.message = 'Météo introuvable pour ' + _city.name
                                + ' (' + json.message + ')';
                        }
                    });
            }
        }
    });
}