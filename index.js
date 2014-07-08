/* Description:
 *   Loads content from Sean Martell's Mozilla logo page.
 *
 * Dependencies:
 *   none
 *
 * Author:
 *    mythmon
 */

var fs = require('fs');
var path = require('path');

module.exports = function(corsica) {

  var youtube_re = RegExp('(youtube.com/.*\\?.*v=([A-Za-z0-9_-]+))|(youtu.be/([A-Za-z0-9_-]+))');
  var template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();

  corsica.on('content', function(msg) {
    console.log(msg);
    if (!('url' in msg)) {
      return msg;
    }

    if (match = msg.url.match(youtube_re)) {
      var id = match[2] || match[4];
      msg.type = 'html';
      msg.content = template.replace('{{ videoID }}', id);
    }

    return msg;
  });

  corsica.on('youtube', function(content) {
    corsica.sendMessage('content', {
      type: 'html',
      content: template.replace('{{ videoID }}', id),
      screen: content.screen,
    });
    return content;
  });
};
