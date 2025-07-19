/**
 * Generates a unique test title based on superheroes and related themes
 * @returns {string} A unique superhero-themed test title (10-30 characters)
 */
function generateSuperheroTestTitle() {
 
  const heroes = [
    "Spider", "Iron", "Thor", "Hulk", "Flash", "Storm", "Nova", "Venom", 
    "Hawk", "Raven", "Blade", "Ghost", "Sonic", "Cyber", "Quantum", "Phoenix"
  ];


  const powers = [
    "Force", "Power", "Strike", "Blast", "Speed", "Mind", "Fire", "Ice",
    "Laser", "Pulse", "Wave", "Max", "Prime", "Ultra", "Hyper", "Mega"
  ];


  const testWords = [
    "Quiz", "Test", "Trial", "Quest", "Battle", "Challenge", "Exam", "Arena"
  ];

  
  const titleFormats = [
    () => `${getRandomItem(heroes)} ${getRandomItem(testWords)}`,
    () => `${getRandomItem(powers)} ${getRandomItem(testWords)}`,
    () => `${getRandomItem(heroes)} ${getRandomItem(powers)}`,
    () => `${getRandomItem(heroes)}-${getRandomItem(powers)}`,
    () => `${getRandomItem(testWords)} ${getRandomItem(heroes)}`,
    () => `${getRandomItem(heroes)} ${Math.floor(Math.random() * 999) + 1}`,
    () => `${getRandomItem(powers)} ${getRandomItem(heroes)}`,
    () => `${getRandomItem(heroes)}${Math.floor(Math.random() * 99) + 1}`
  ];


  function getRandomItem(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

 
  let title = "";
  let attempts = 0;
  
  do {
    const formatFunction = getRandomItem(titleFormats);
    title = formatFunction();
    attempts++;
  } while ((title.length < 10 || title.length > 30) && attempts < 50);

  
  if (title.length < 10 || title.length > 30) {
    title = `${getRandomItem(heroes)} ${getRandomItem(testWords)}`;
  }

  return title;
}



export default generateSuperheroTestTitle;