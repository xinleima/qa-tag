const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../build')));


app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.send(200);
  }

  next();
});


const questions = [
  {
    id: 1,
    title: `What is the difference between range and xrange functions in Python 2.X?`,
    body: `<p>Apparently xrange is faster but I have no idea why it's faster (and no proof besides the anecdotal so far that it is faster) or what besides that is different about</p>\n\n<pre><code>for i in range(0, 20):\nfor i in xrange(0, 20):\n</code></pre>\n`
  },
  {
    id: 2,
    title: 'How do you configure Django for simple development and deployment?',
    body: `<p>I tend to use <a href=\"http://en.wikipedia.org/wiki/SQLite\">SQLite</a> when doing <a href=\"http://en.wikipedia.org/wiki/Django%5F%28web%5Fframework%29\">Django</a>\ndevelopment, but on a live server something more robust is\noften needed (<a href=\"http://en.wikipedia.org/wiki/MySQL\">MySQL</a>/<a href=\"http://en.wikipedia.org/wiki/PostgreSQL\">PostgreSQL</a>, for example).\nInvariably, there are other changes to make to the Django\nsettings as well: different logging locations / intensities,\nmedia paths, etc.</p>\n\n<p>How do you manage all these changes to make deployment a\nsimple, automated process?</p>\n`
  },
  {
    id: 3,
    title: 'How do I sort a list of dictionaries by values of the dictionary in Python?',
    body: `<p>I got a list of dictionaries and want that to be sorted by a value of that dictionary.</p>\n\n<p>This</p>\n\n<pre><code>[{'name':'Homer', 'age':39}, {'name':'Bart', 'age':10}]\n</code></pre>\n\n<p>sorted by name, should become</p>\n\n<pre><code>[{'name':'Bart', 'age':10}, {'name':'Homer', 'age':39}]\n</code></pre>\n`
  },
  {
    id: 4,
    title: 'How do I split a string into a list?',
    body: `<p>If I have this string:</p>\n\n<blockquote>\n  <p>2+24*48/32</p>\n</blockquote>\n\n<p>what is the most efficient approach for creating this list:</p>\n\n<blockquote>\n  <p>['2', '+', '24', '*', '48', '/', '32']</p>\n</blockquote>\n`
  },
  {
    id: 5,
    title: 'Stripping non printable characters from a string in python',
    body: `<p>I use to run</p>\n\n<pre><code>$s =~ s/[^[:print:]]//g;\n</code></pre>\n\n<p>on Perl to get rid of non printable characters. </p>\n\n<p>In Python there's no POSIX regex classes, and I can't write [:print:] having it mean what I want. I know of no way in Python to detect if a character is printable or not. </p>\n\n<p>What would you do? </p>\n\n<p>EDIT: It has to support Unicode characters as well. The string.printable way will happily strip them out of the output. \ncurses.ascii.isprint will return false for any unicode character.</p>\n`
  },
  {
    id: 6,
    title: 'How to import a module given the full path?',
    body: `<p>How can I load a Python module given its full path? Note that the file can be anywhere in the filesystem, as it is a configuration option.</p>\n`
  },
  {
    id: 7,
    title: 'Take a screenshot via a python script. [Linux]',
    body: `<p>I want to take a screenshot via a python script and unobtrusively save it.</p>\n\n<p>I'm only interested in the Linux solution, and should support any X based environment.</p>\n`
  },
  {
    id: 8,
    title: 'Python: user input and commandline arguments',
    body: `<p>How do I have a Python script that can accept user input (assuming this is possible) and how do I make it read in arguments if run from the command line?</p>\n`
  },
  {
    id: 9,
    title: 'Stripping non printable characters from a string in python',
    body: `<p>I use to run</p>\n\n<pre><code>$s =~ s/[^[:print:]]//g;\n</code></pre>\n\n<p>on Perl to get rid of non printable characters. </p>\n\n<p>In Python there's no POSIX regex classes, and I can't write [:print:] having it mean what I want. I know of no way in Python to detect if a character is printable or not. </p>\n\n<p>What would you do? </p>\n\n<p>EDIT: It has to support Unicode characters as well. The string.printable way will happily strip them out of the output. \ncurses.ascii.isprint will return false for any unicode character.</p>\n`
  },
];

app.get('/api/questions', function (req, res, next) {

  res.send({
    questions
  })
});

app.get('/api/question/:id', function (req, res, next) {
  const id = parseInt(req.params.id, 10);

  const question = questions.find((item) => item.id === id);

  res.send(question)
});

app.use('/api', proxy('localhost:8000'));

app.all('*', function (req, res, next) {
  res.sendfile(path.join(__dirname, '../build/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});