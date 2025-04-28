import { Test } from '../types';

export const mockTest: Test = {
  id: 'test-1',
  title: 'Web Development Fundamentals',
  description: 'Test your knowledge of web development fundamentals including HTML, CSS, JavaScript, and React.',
  timeLimit: 60, // 60 minutes
  categories: [
    {
      id: 'cat-1',
      name: 'HTML',
      questions: [
        {
          id: 'q1',
          text: 'What does HTML stand for?',
          options: [
            'Hyper Text Markup Language',
            'High Tech Modern Language',
            'Hyperlink Text Management Language',
            'Home Tool Markup Language'
          ],
          correctAnswer: 0
        },
        {
          id: 'q2',
          text: 'Which HTML tag is used to define an internal style sheet?',
          options: [
            '<css>',
            '<script>',
            '<style>',
            '<link>'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          text: 'Which HTML attribute is used to define inline styles?',
          options: [
            'class',
            'styles',
            'font',
            'style'
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      id: 'cat-2',
      name: 'CSS',
      questions: [
        {
          id: 'q4',
          text: 'What does CSS stand for?',
          options: [
            'Creative Style Sheets',
            'Cascading Style Sheets',
            'Computer Style Sheets',
            'Colorful Style Sheets'
          ],
          correctAnswer: 1
        },
        {
          id: 'q5',
          text: 'Which property is used to change the background color?',
          options: [
            'color',
            'bgcolor',
            'background-color',
            'background'
          ],
          correctAnswer: 2
        },
        {
          id: 'q6',
          text: 'How do you select an element with id "demo"?',
          options: [
            '.demo',
            '#demo',
            'demo',
            '*demo'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'cat-3',
      name: 'JavaScript',
      questions: [
        {
          id: 'q7',
          text: 'Inside which HTML element do we put the JavaScript?',
          options: [
            '<js>',
            '<scripting>',
            '<javascript>',
            '<script>'
          ],
          correctAnswer: 3
        },
        {
          id: 'q8',
          text: 'How do you create a function in JavaScript?',
          options: [
            'function myFunction()',
            'function = myFunction()',
            'function:myFunction()',
            'create myFunction()'
          ],
          correctAnswer: 0
        },
        {
          id: 'q9',
          text: 'How do you call a function named "myFunction"?',
          options: [
            'call myFunction()',
            'myFunction()',
            'call function myFunction()',
            'execute myFunction()'
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'cat-4',
      name: 'React',
      questions: [
        {
          id: 'q10',
          text: 'What is React?',
          options: [
            'A JavaScript library for building user interfaces',
            'A programming language',
            'A database management system',
            'A server-side framework'
          ],
          correctAnswer: 0
        },
        {
          id: 'q11',
          text: 'Which function is used to update state in a React functional component?',
          options: [
            'this.state()',
            'useState()',
            'this.setState()',
            'updateState()'
          ],
          correctAnswer: 1
        },
        {
          id: 'q12',
          text: 'What is JSX in React?',
          options: [
            'JavaScript XML - A syntax extension for JavaScript',
            'A JavaScript library',
            'JSON XML format',
            'JavaScript Extension'
          ],
          correctAnswer: 0
        }
      ]
    }
  ]
};