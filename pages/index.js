const url = 'https://nikosps.pockethost.io'
const client = new PocketBase(url)

//Συνάρτηση που στέλνει τα στατιστικά του χρήστη στον server 
//και προχωράει στην επόμενη σελίδα
async function submitStatisticsAndReturnHome(){
  const userStat = await pb.collection('userStatistics').create(userStatistics);
  resetAllAnswers();
  window.location.href = '../index.html';
}

//Συνάρτηση που στέλνει την αξιολόγηση και ενδεχόμενες προτάσεις του χρήστη
//για αλλαγή στον server και προχωράει στην επόμενη σελίδα 
async function submitEvaluationAndNext(){
  const userEval = await pb.collection('userEvaluation').create(userEvaluation);
  const userChan = await pb.collection('userChanges').create(userChanges);
  window.location.href = 'statistika.html';
}

//Συνάρτηση που στέλνει τις απαντήσεις του χρήστη στον server
//και προχωράει στην επόμενη σελίδα
async function submitUserAnswersAndNext(){
  const userAnswersNumbers = await pb.collection('numbers').create(userAnswers["ask_diak1"]);
  const userAnswersCities = await pb.collection('cities').create(userAnswers["ask_diak2"]);
  //προσθήκη του object με τις απαντήσεις της άσκησης διακλάδωσης 1
  //σαν τιμή στο κλειδί ask_diak1 του object userAnswers 
  userAnswers.ask_diak1 = userAnswersNumbers.id ;
  //προσθήκη του object με τις απαντήσεις της άσκησης διακλάδωσης 2
  //σαν τιμή στο κλειδί ask_diak2 του object userAnswers
  userAnswers.ask_diak2 = userAnswersCities.id ;
  const userAnsw = await pb.collection('userAnswers').create(userAnswers);
  window.location.href = 'results.html';
}

