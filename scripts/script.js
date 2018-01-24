(function () {
    var keys = document.getElementById('keys'),
        keysSpan = document.querySelectorAll('.keys span'),
        resultStr = document.getElementById('result'),
        operationsArithmetic = {
            '÷': division,
            'x': multiplication,
            '-': subtraction,
            '+': addition
        },
        operationsAdditional = {
            '+/-': changeSign,
            '%': percent
        },
        prev = 0,
        cur = 0,
        operation = null;

    keys.onclick = function (e) {
        e.preventDefault();

        var target = e.target,
            btn = target.innerHTML;

        if (target.tagName !== 'SPAN') {
            return false;
        }
        setActiveClass(keysSpan, target);

        if (btn === 'C') {
            resultStr.innerHTML = '0';
            operation = null;
            prev = 0;
            cur = 0;
            return false;
        }

        if (resultStr.innerHTML === '0' && btn !== ',') {
            resultStr.innerHTML = '';
        }

        if (btn === ',' && resultStr.innerHTML.indexOf(',') > -1) {
            return false;
        }

        if (btn === '=') {
            if (prev && cur) {
                resultStr.innerHTML = floatToHtmlStr(operation(prev, cur));
                cur = resultStr.innerHTML;
                prev = null;
            }

            return false;
        }

        if (operationsAdditional[btn]) {
            resultStr.innerHTML = floatToHtmlStr(operationsAdditional[btn](resultStr.innerHTML));
            cur = resultStr.innerHTML;
            return false;
        }

        if (operationsArithmetic[btn]) {
            if (prev && cur) {
                resultStr.innerHTML = floatToHtmlStr(operation(prev, cur));
                cur = resultStr.innerHTML;
                prev = null;
            }

            operation = operationsArithmetic[btn];
            return false;
        }

        if (!prev && operation) {
            prev = cur;
            resultStr.innerHTML = '';
        }

        resultStr.innerHTML = resultStr.innerHTML + btn;
        cur = resultStr.innerHTML;
    };

    function addition(op1, op2) {
        return htmlStrToFloat(op1) + htmlStrToFloat(op2);
    }

    function subtraction(op1, op2) {
        return htmlStrToFloat(op1) - htmlStrToFloat(op2);
    }

    function multiplication(op1, op2) {
        return htmlStrToFloat(op1) * htmlStrToFloat(op2);
    }

    function division(op1, op2) {
        if (htmlStrToFloat(op1) === 0) {
            return 0;
        }

        return htmlStrToFloat(op1) / htmlStrToFloat(op2);
    }

    function changeSign(op1) {
        return (-1) * htmlStrToFloat(op1);
    }

    function percent(op1) {
        op1 = op1.toString().replace(',', '.');
        return division(htmlStrToFloat(op1), 100);
    }

    function setActiveClass(elements, target) {
        elements.forEach(function (span) {
            span.classList.remove('active');
        });
        target.classList.add('active');
    }

    function htmlStrToFloat(val) {
        return parseFloat(val.toString().replace(',', '.'));
    }

    function floatToHtmlStr(val) {
        return val.toString().replace('.', ',')
    }
})();
