var count = 0,
    set = '',
    dragging = false
$(function() {

    $('.add').on('click', function(e) {
        "use strict"
        e.preventDefault()
        let input = $('.input').val()
        if ($.trim(input) != '') {
            _hint('Hold and Drag to sort!')
            newList(input)
        }
    })
    $('.input').on('focus', function() {
        $(this).val('')
        _hint('Add some lists!')
        return;
    })
    $('input').on('blur', function() {
        if ($('.listArea').find('p').length >= 1)
            _hint('Hold and Drag to sort!')
        else
            _hint('Add some lists!')
    })
    $(window).on('keydown', function(e) {
        if (e.keyCode == 13)
            $('.add').click()
    })
    $('.listArea')
        .sortable({
            revert: false
        });
})

function newList(input) {
    "use strict"
    $('.input').val('')
    count++
    $('.listArea').prepend('<p id="list' + count + '" >' +
            '<span class="line"></span>' +
            '<span class="text">' +
            '<input type="checkbox" name="">' +
            input +
            '</span>' +
            '<span class="edit">' +
            '<a class="glyphicon glyphicon-trash"></a>' +
            '</span>' +
            '</p>')
    let newlist=$('#list'+count)
    newlist.animate({ opacity: '1' })
    deleteList(newlist)
    doneList(newlist)
    //dragEvent(newlist)
}

function deleteList(newlist) {

    newlist.find('a').on('vclick touchend', function(e) {
        _hint('You just delete a list')
        e.preventDefault()
        newlist.animate({ opacity: '0' }, 400)
        setTimeout(function() {
            newlist.remove()
        }, 400)
    })
}

function doneList(newlist) {

    newlist.find('input').on('vclick touchend', function() {
        if ($(this).is(':checked'))
            _check(newlist)
        else //actually no way
            _uncheck(newlist)
    })
}

function _check(list) {
    "use strict"
    _hint('Completed!')
    list.css({
            backgroundColor: 'lightgray',
            borderColor: 'gray'
        })
        .find('.line').animate({ opacity: '1' })

    list.animate({ opacity: '0' }, 400)

    let content = list.html(),
        id = list.attr('id')

    setTimeout(function() {
        list.remove()
    }, 400)

    let newlist = $('.listArea').append('<p id="' + id + '">' + content + '</p>')
        .find('p').last()

    newlist.css({
        opacity: '0',
        backgroundColor: 'lightgray',
        borderColor: 'gray'
    }).animate({ opacity: '1' }).find('.line').css({ opacity: '1' })
    newlist.find('input').attr('checked', true).on('click', function() {
        if ($(this).is(':checked')) //actually no way
            _check(newlist)
        else
            _uncheck(newlist)
    })
    deleteList(newlist)
    //dragEvent(newlist)
}

function _uncheck(list) {
    "use strict"
    _hint('Oops!')
    list.css({
            backgroundColor: 'lightgoldenrodyellow',
            borderColor: 'yellow'
        })
        .find('.line').animate({ opacity: '1' })

    list.animate({ opacity: '0' }, 400)

    let content = list.html(),
        id = list.attr('id')

    setTimeout(function() {
        list.remove()
    }, 400)
    let newlist = $('.listArea').prepend('<p id="' + id + '">' + content + '</p>')
        .find('p').first()

    newlist.animate({ opacity: '1' }).find('.line').animate({ opacity: '0' })
    newlist.find('input').attr('checked', false).on('click', function() {
        if ($(this).is(':checked')) //actually no way
            _check(newlist)
        else
            _uncheck(newlist)
    })
    deleteList(newlist)
    //dragEvent(newlist)
}

function _hint(text) {

    $('.hint').css({ opacity: '0' }).text(text).animate({ opacity: '1' })

}
//drag event write by myown, however jquery ui is much better and stronger.
// function dragEvent(list){
//     "use strict"
//     let id=list.attr('id')
//     document.getElementById(id).addEventListener('touchend',function(){
//         if(dragging){
//             alert('drag')
//             set=''
//             $('.temp').remove()
//         } else{
//             alert('tap')
//         }               
//     },false)
//     document.getElementById(id).addEventListener('touchstart',function(){
//         dragging=false;
//     },false)
//     document.getElementById(id).addEventListener('touchmove',function(){
//         dragging=true;
//     },false)
//  list.on('dragstart',function(e){    
//      e.originalEvent.dataTransfer.setData('text',e.target.id);
//  })
//  .on('dragend',function(){
//      set=''
//      $('.temp').remove()
//  })
//  .on('dragover',function(e){
//         dragging=true;
//         "use strict"
//      e.preventDefault()      
//      if(set!=$(this).attr('id')){
//          let dropWh=$(this)
//          set=$(this).attr('id')
//          $('.temp').remove()
//          $('<p class="temp" set="after"></p>').insertAfter(list)
//          $('<p class="temp" set="before"></p>').insertBefore(list)

//          $('.temp').on('dragover',function(e){
//              e.preventDefault()
//          })
//          .on('drop',function(e){
//                 "use strict"
//              let id=e.originalEvent.dataTransfer.getData('text')
//              if($(this).attr('set')=='before'){
//                  $('#'+id).insertBefore(dropWh)
//              } else{
//                  $('#'+id).insertAfter(dropWh)
//              }
//          })
//      } 
//  })
// }