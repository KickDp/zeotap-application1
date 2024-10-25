function validateRuleString(rule_string) {
    // Add your validation logic here (basic example)
    return typeof rule_string === 'string' && rule_string.trim().length > 0;
  }
  
  module.exports = { validateRuleString };
  