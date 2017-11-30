var correct = window.location.search
if (correct) {
    correct = correct.replace('?', '')

    document.getElementById('sucesso').className = " cadastro_sucesso"
    setTimeout(() => {
        document.getElementById('sucesso').style.display = 'none'
        window.location.href = 'cadastrar'
    }, 5000)
}

var cont = 0;

function duplicarForm() {
    if (cont == 0) {
        document.getElementById("formu_responsavel").style.display = 'block'
        document.getElementById("choice").disabled = true
        document.getElementById("choice").style.display = 'none'
        cont++
        return false
    }
    if (cont <= 2) {
        var formResponsavel = document.getElementById("form_respon")
        var novoForm = formResponsavel.cloneNode(true)
        document.getElementById('formu_responsavel').appendChild(novoForm)
        cont++
    } else {
        return false
    }
    $('.classCpf').mask('###.###.###-##')
    $('.classCelular01').mask('(35) 99999-9999')
    $('.classCelular02').mask('(35) 99999-9999')
    $('.classNascimento').mask('99/99/9999', {placeholder: 'Data de nascimento'})

}

function dateMask() {
    var v = this.value;
    if (v.match(/^\d{2}$/) !== null) {
        this.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        this.value = v + '/';
    }
}

