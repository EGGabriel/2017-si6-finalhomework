var usuarios = Array()
var index = 0
$(document).ready(function() {

    $('#botaoAdicionar').bind('click', function() {
        let otherCampo = ` <div id="campoAluno${index + 1}"> 
                    <input data-x="${index + 1}" class="form alunos" type="text" name="nome_aluno[]" maxlength="100" id="idAluno${index + 1}" placeholder="Escolha o Aluno" list="alunos${index + 1}" class="form campoAluno" onkeyup="clickTeclado(this)"/>
                    
                    <datalist id="alunos${index + 1}">
                        <option class="opcoes"></option>
                    </datalist>
                    <span class="closebtn" onclick="removeComponent(this)">&times;</span> 
                    <div class="mensagemError${index + 1}">
                        <h4></h4>
                    </div>
                    </div>`
        $('.partAlunos').append(otherCampo)
        index++

    })

    $('.cel').mask('(35) 99999-9999')
    $('#idCpf').mask('999.999.999-99')




    $('#idAluno').bind('keyup', function(e) {


        $.ajax({
            type: 'POST',
            data: { key: $('#idAluno').val() },
            url: '/ajax/getAluno',
            beforeSend: zerarOption,
            success: function(data) {

                if (data.length == 0) {
                    $('#idAluno').addClass('error')
                    $('.errorMensagem0').remove()
                    $('.mensagemError0').append('<h4 style="color: red" class="errorMensagem0">Usuario inexistente</h4>')


                } else {
                    $('.errorMensagem0').remove()
                    $('#idAluno').removeClass('error')

                }
                data.forEach(content => {
                    usuarios.push(content.id)
                    $('#alunos').append(`<option value="${content.id}" class="opcoes">${content.nome}</option>`)
                })
            }
        })

    })
})

function removeComponent(component) {
    $(component).parent().remove()
}



function zerarOption() {
    $('.opcoes').remove()

}

function verificarCampo(same) {
    let alunos = document.getElementsByClassName('alunos')

    for (let i = 0; i < alunos.length; i++) {

        if (!usuarios.includes(parseInt(alunos[i].value))) {
            $(alunos[i]).addClass('error')

            if ($('.mensagemError' + i).find('.errorMensagem' + i).length == 0) {
                $('.mensagemError' + i).append(`<h4 style="color: red" class="errorMensagem${i}">Usuario inexistente</h4>`)

            }

            return false


        } else {
            $(alunos[i]).removeClass('error')
            $('.errorMensagem' + i).remove()

        }
    }

    return true

}


function clickTeclado(same) {
    let indice = $(same).attr('data-x')
    console.log(same)
    $.ajax({
        type: 'POST',
        data: { key: $(same).val() },
        url: '/ajax/getAluno',
        beforeSend: zerarOption,
        success: function(data) {

            if (data.length == 0) {
                $(same).addClass('error')
                $(`.errorMensagem${indice}`).remove()
                $(`.mensagemError${indice}`).append(`<h4 style="color: red" class="errorMensagem${indice}">Usuario inexistente</h4>`)


            } else {
                $(`.errorMensagem${indice}`).remove()
                $(same).removeClass('error')

            }
            data.forEach(content => {
                usuarios.push(content.id)
                $(`#alunos${indice}`).append(`<option value="${content.id}" class="opcoes">${content.nome}</option>`)
            })
        }
    })


}