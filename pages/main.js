// Μεταβλητή στην οποία θα αποθηκεύονται οι τιμές των απαντήσεων
let userAnswers = {};

// Μεταβλητή στην οποία θα αποθηκεύονται οι τιμές από την αξιολόγηση
let userEvaluation = {};

// Μεταβλητή στην οποία θα αποθηκεύονται τα στατιστικά στοιχεία του χρήστη
let userStatistics = {};

// Μεταβλητή στην οποία θα αποθηκεύεται προτεινόμενες αλλαγές
let userChanges ={};

function loadAnswers() {
    userAnswers = JSON.parse(localStorage.getItem('answers'));
}

function saveAnswers() {
    localStorage.setItem('answers', JSON.stringify(userAnswers));
}

//Συνάρτηση που μηδενίζει τις απαντήσεις σε όλα τα objects
function resetAllAnswers() {
    userAnswers = {};
    saveAnswers();
    userEvaluation = {};
    userStatistics = {};
    userChanges ={}
}

/* Συνάρτηση που διαβάζει τα αποθηκευμένα δεδομένα, προσθέτει την καινούργια απάντηση 
   τύπου radio και την αποθηκεύει εκ νέου*/
function askSubmitHandler(ask, radioName) { 
    loadAnswers();
    // Πάρε την απάντηση από τη φόρμα 
    const answer = getRadioAnswer(radioName);
    alert("Η απάντηση αποθηκεύτηκε.");
    // Αποθήκευσέ την στο τύπου object userAnswers
    if ( userAnswers === null ) {
        userAnswers = {};
    } 
    userAnswers[ask] = answer;
    saveAnswers();
    //alert(JSON.stringify(userAnswers, null, 2));
}

// Συνάρτηση που αποθηκεύει τα στοιχεία της αξιολόγησης στη μεταβλητή userEvaluation
function evalSubmitHandler(_eval) { 
    var ele = document.getElementsByName(_eval);
    
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
        userEvaluation[_eval] = ele[i].value;
    }
    alert("Η απάντηση αποθηκεύτηκε ."); 
}

// Συνάρτηση που αποθηκεύει προτεινόμενες αλλαγές στη μεταβλητή userChanges
function changesSubmitHandler(changes){
    const ele2 = document.getElementById(changes);
    userChanges[changes] = ele2.value;
}

/* Συνάρτηση που αποθηκεύει τα στατιστικά στοιχεία του χρήστη 
   στη μεταβλητή userEvaluation */
function statSubmitHandler(stat) { 
    var ele3 = document.getElementsByName(stat);
 
    for (i = 0; i < ele3.length; i++) {
        if (ele3[i].checked)
        userStatistics[stat] = ele3[i].value;
    }   
    alert("Η απάντηση αποθηκεύτηκε .");
}

// Συνάρτηση που επιστρέφει την τιμή από την απάντηση του χρήστη 
function getRadioAnswer(radioGroupName) {
    let result = undefined;
    const answers = document.getElementsByName(radioGroupName)
    // Αποθήκευσε την τιμή της απάντησης του χρήστη στη μεταβλητή result
    answers.forEach(
        (answer) => {
            if (answer.checked) 
                result = answer.value;
            }
    );
    return result;
}

function getSelectAnswer(selectId){
    return document.getElementById(selectId).value;   
}

// Συνάρτηση που επιστρέφει την τιμή από την απάντηση του χρήστη για κάθε select
function Diakl_ElegAsk(){
    return {
        numbers1: getSelectAnswer("numbers1"),
        numbers2: getSelectAnswer("numbers2"),
        numbers3: getSelectAnswer("numbers3"),
        numbers4: getSelectAnswer("numbers4"),
        numbers5: getSelectAnswer("numbers5"),
        numbers6: getSelectAnswer("numbers6"),
        numbers7: getSelectAnswer("numbers7"),
        numbers8: getSelectAnswer("numbers8")
    };
}

/* Συνάρτηση που διαβάζει τα αποθηκευμένα δεδομένα, προσθέτει την καινούργια απάντηση 
   τύπου select και την αποθηκεύει εκ νέου*/
function askSubmitHandler_Diaklad(ask) { 
    loadAnswers();
    // Παίρνει την απάντηση από τη φόρμα 
    const answer = Diakl_ElegAsk();
    alert("Η απάντηση αποθηκεύτηκε .");
    // Την αποθηκεύει στο τύπου object userAnswers
    if ( userAnswers === null ) {
        userAnswers = {};
    } 
    userAnswers[ask] = answer;
    saveAnswers();
}

//Βοηθητική συνάρτηση που εμφανίζει την απάντηση του χρήστη και αν είναι Σωστή ή Λάθος
function addAnswerToElement(parentElement, id, title, answer, result) {
    const elem = document.createElement('div');
    elem.id = id;
    elem.innerHTML += '<h4>' + title + '</h4>'
        + 'Απάντησες <span class="userAnswer">' + answer + '</span> '
        + 'και είναι '
        + (result 
            ? '<span class="userCorrectResult">Σωστό</span>'
            : '<span class="userWrongResult">Λάθος</span>');

    parentElement.appendChild(elem);
}

//Συνάρτηση που εμφανίζει τις απαντήσεις και τη βαθμολογία του χρήστη
function printResults() {
    loadAnswers(); // Φόρτωση των απαντήσεων στη μεταβλητή userAnswers
    let mykeys = Object.getOwnPropertyNames(correct_answers);
    const results = checkAnswers(correct_answers, userAnswers);
    const parentElement = document.getElementById("resultsContainer");
    var score = 0;//μεταβλητή που αποθηκεύεται η βαθμολογία
    
    for ( i in mykeys) {
        const key = mykeys[i];
        let userAnswer = userAnswers[key];
        if (key === 'ask_diak1' || key === 'ask_diak2') {
            userAnswer = Object.getOwnPropertyNames(userAnswer).map(a => userAnswer[a]).join(', ');
        }

        addAnswerToElement(
            parentElement,
            key,
            correct_answers[key].title,
            userAnswer,
            results[key]
        );

        if (results[key] == true) {
            score += 1;
        }
        
        console.log(
            correct_answers[key].title,
            userAnswers[key],
            results[key]
        );
    }
    
    document.getElementById("score").innerHTML =  '<h3>' + "Η βαθμολογία σου είναι " + score + " στα 6" + '<h3/>' ;
}