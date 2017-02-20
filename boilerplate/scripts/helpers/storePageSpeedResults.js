const fs = require('fs-extra');
const path = require('path');

const strategies = ['mobile', 'desktop'];

/**
 * Format JSON as HTML tables and save
 */
function storePageSpeedResults(results) {
  return new Promise((resolve, reject) => {
    const json = {
      results,
    };
    const basePath = path.join(process.cwd(), 'build', 'web');
    fs.writeJSON(
      path.join(basePath, 'page_speed_report.json'),
      json,
      {
        spaces: 2,
      },
      (err) => {
        if (err) {
          reject(err);
        }
      }
    );
    // builds a gross table
    // function buildTable(obj, prefix = '') {
    //   let head = '';
    //   let body = '';
    //   if (obj && typeof obj === 'object') {
    //     if (Array.isArray(obj)) {
    //       obj.forEach(item => (body += buildTable(item, `  ${prefix}`)));
    //     }
    //     else {
    //       head += `${prefix}<table>\n`;
    //       head += `${prefix}  <thead>\n${prefix}    <tr>\n`;
    //       body += `${prefix}  <tbody>\n${prefix}    <tr>\n`;
    //       for (const key in obj) {
    //         const val = obj[key];
    //         head += `${prefix}      <th>${key}</th>\n`;
    //         body += `${prefix}      <td>\n${buildTable(val, `      ${prefix}`)}`
    //              + `${prefix}      </td>\n`;
    //       }
    //       head += `${prefix}    </tr>\n${prefix}  </thead>\n`;
    //       body += `${prefix}    </tr>\n${prefix}  </tbody>\n`;
    //       body += `${prefix}</table>\n`;
    //     }
    //     return `${head}\n${body}`;
    //   }
    //   else if (
    //     typeof obj === 'string'
    //     || typeof obj === 'number'
    //     || typeof obj === 'boolean'
    //   ) {
    //     // return simple types
    //     body += `${prefix}  ${obj}\n`;
    //     return body;
    //   }
    //   else {
    //     return body;
    //   }
    // }
    // step through manually
    let html = '<!doctype html><html><head><meta charset="UTF-8"><title>PageSpeed Insights'
      + ' Results</title></head><body>';
    json.results.forEach((result, j) => {
      html += `<h1>${strategies[j]} ${result.title}</h1>`;
      for (const i in result.ruleGroups) {
        html += `<h2>${i}: ${result.ruleGroups[i].score}</h2>`;
      }
      for (const i in result.pageStats) {
        html += `<h3>${i}: ${result.pageStats[i]}</h3>`;
      }
      const rules = [];
      for (const i in result.formattedResults.ruleResults) {
        rules.push(result.formattedResults.ruleResults[i]);
      }
      rules.sort((a, b) => b.ruleImpact - a.ruleImpact)
        .forEach((val) => {
          html += `<h5>${val.localizedRuleName}</h5>`;
          html += `<p>Rule impact: ${val.ruleImpact} | Rule Category: ${val.groups.join(', ')}</p>`;
          if (val.summary) {
            const i = val.summary.format.indexOf('Learn more at');
            const sum = i > -1
              ? val.summary.format.slice(0, i)
              : val.summary.format;
            html += `<p>${sum}</p>`;
          }
        });
    });
    html += '</body></html>';
    // const parsedTables = buildTable(results);
    fs.outputFile(
      path.join(basePath, 'page_speed_report.html'),
      html,
      (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      }
    );
  });
}

module.exports = storePageSpeedResults;
