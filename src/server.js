const express = require('express');
const mongoose = require('./db');
const { create_rule, combine_rules, evaluate_rule } = require('./ruleEngine');
const { validateRuleString } = require('./utils');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static('public'));
app.post('/create_rule', (req, res) => {
  const { rule_string } = req.body;
  
  if (!rule_string) {
    return res.status(400).send({ error: 'Rule string is required' });
  }
  
  if (!validateRuleString(rule_string)) {
    return res.status(400).send({ error: 'Invalid rule string' });
  }

  try {
    const ast = create_rule(rule_string);
    res.send(ast);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/combine_rules', (req, res) => {
  const { rules } = req.body;

  if (!rules || !Array.isArray(rules)) {
    return res.status(400).send({ error: 'Rules must be an array' });
  }

  const combinedAst = combine_rules(rules);
  res.send(combinedAst);
});

app.post('/evaluate_rule', (req, res) => {
  const { ast, data } = req.body;

  if (!ast || !data) {
    return res.status(400).send({ error: 'AST and data are required' });
  }

  try {
    const result = evaluate_rule(ast, data);
    res.send({ result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
