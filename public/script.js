document.getElementById('createRuleBtn').addEventListener('click', async () => {
    const ruleString = document.getElementById('ruleInput').value;

    const response = await fetch('/create_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rule_string: ruleString })
    });

    const data = await response.json();
    document.getElementById('createRuleOutput').textContent = JSON.stringify(data, null, 2);
});

document.getElementById('combineRulesBtn').addEventListener('click', async () => {
    const rules = document.getElementById('combineRulesInput').value.split('\n').filter(Boolean);

    const response = await fetch('/combine_rules', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rules })
    });

    const data = await response.json();
    document.getElementById('combineRulesOutput').textContent = JSON.stringify(data, null, 2);
});

document.getElementById('evaluateRuleBtn').addEventListener('click', async () => {
    const ast = JSON.parse(document.getElementById('evaluateAstInput').value);
    const data = JSON.parse(document.getElementById('evaluateDataInput').value);

    const response = await fetch('/evaluate_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ast, data })
    });

    const result = await response.json();
    document.getElementById('evaluateOutput').textContent = JSON.stringify(result, null, 2);
});
