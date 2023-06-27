// Object στο οποίο υπάρχουν οι σωστές απαντήσεις
var correct_answers = {
    ask_akol1: {
        title:  "Άσκηση Ακολουθίας-Αναδρομής 1",
        answer: "8"
    },
    ask_akol2: {
        title:  "Άσκηση Ακολουθίας-Αναδρομής 2",
        answer: "δ"
    },
    ask_epan1: {
        title:  "Άσκηση Επανάληψης 1",
        answer: "63"
    },
    ask_epan2: {
        title:  "Άσκηση Επανάληψης 2 - Έλεγχος",
        answer: "2.5"
    },   
    ask_diak1: {
        title:  "Διακλάδωση και έλεγχος - Άσκηση 1",
        answer: {
            "numbers1":"32",
            "numbers2":"26",
            "numbers3":"2",
            "numbers4":"18",
            "numbers5":"15",
            "numbers6":"11",
            "numbers7":"27",
            "numbers8":"23"
        }
    },  
    ask_diak2: {
        title:  "Διακλάδωση και έλεγχος - Άσκηση 2",
        answer: {
            "numbers1":"Παρίσι",
            "numbers2":"Μόναχο",
            "numbers3":"Σόφια",
            "numbers4":"Θεσσαλονίκη",
            "numbers5":"Νέα Υόρκη",
            "numbers6":"Μόντρεαλ",
            "numbers7":"Πεκίνο",
            "numbers8":"Μανίλα"
        }        
    }
};

/* Συνάρτηση που ελέγχει αν οι απαντήσεις του χρήστη είναι σωστές ή λάθος
και επιστρέφει ένα Object res με αυτές. */
function checkAnswers(answerDefinitions, answers) {
    let res = {};
    let mykeys = Object.getOwnPropertyNames(answerDefinitions);
    for ( i in mykeys) {
        const key = mykeys[i];
        if ( JSON.stringify(answers[key]) === JSON.stringify(answerDefinitions[key].answer)) {
            res[key] = true;
        }
        else {
            res[key] = false;
        }
    }
    return res;
}