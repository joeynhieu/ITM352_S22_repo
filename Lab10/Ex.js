//determines the day of the week that I was born on

day = 1;
month = "December";
year = 2001;


step1 = year - 2000;
console.log(step1);
step2 = parseInt(step1/4);
console.log(step2);
step3 = step2 + step1;
console.log(step3);
step4 = 5;
step6 = step4 + step3;
console.log(step6);
step7 = day + step6;
console.log(step7);
step8 = step7 - 1;
step9 = step8 % 7;

//returns the result of step 9 ==> 0-6: days of the week
console.log(step9);