var count=0,
 	set=''
$(function() {
	
    $('.add').on('click', function(e) {
        e.preventDefault()
        let input = $('.input').val()
        if ($.trim(input) != ''){
        	_hint('Hold and Drag to sort!')
            newList(input)
        }
    })
    $('.input').on('focus', function() {
        $(this).val('')
        _hint('Add some lists!')
        return;
    })
    $('input').on('blur',function(){
    	if($('.listArea').find('p').length>=1)
    		_hint('Hold and Drag to sort!')
    	else
    		_hint('Add some lists!')
    })
    $(window).on('keydown', function(e) {
        if (e.keyCode == 13)
            $('.add').click()
    })
})

function newList(input) {
    $('.input').val('')
    count++
    let newlist = $('.listArea').prepend('<p draggable="true" id="list'+count+'">' +
            '<span class="line"></span>' +
            '<span class="text">' +
            '<input type="checkbox" name="">' +
            input +
            '</span>' +
            '<span class="edit">' +
            '<a class="glyphicon glyphicon-trash"></a>' +
            '</span>' +
            '</p>')
        .find('p').first()
    newlist.animate({ opacity: '1' })
    deleteList(newlist)
    doneList(newlist)
    dragEvent(newlist)
}

function deleteList(newlist) {
	
    newlist.find('a').on('click', function(e) {
        _hint('You just delete a list')
        e.preventDefault()
        newlist.animate({ opacity: '0' }, 400)
        setTimeout(function() {
            newlist.remove()
        }, 400)
    })
}

function doneList(newlist) {
	
    newlist.find('input').on('click', function() {
        if ($(this).is(':checked'))
            _check(newlist)
        else //actually no way
            _uncheck(newlist)
    })
}
function dragEvent(list){
	list.on('dragstart',function(e){
	
		e.originalEvent.dataTransfer.setData('text',e.target.id);
	})
	.on('dragend',function(e){
		console.log('end')
		set=''
		$('.temp').remove()
	})
	.on('dragenter',function(e){
		e.preventDefault()
	})
	.on('dragover',function(e){
		e.preventDefault()		
		if(set!=$(this).attr('id')){
			let dropWh=$(this)
			set=$(this).attr('id')
			$('.temp').remove()
			$('<p class="temp" set="after"></p>').insertAfter(list)
			$('<p class="temp" set="before"></p>').insertBefore(list)
			
			$('.temp').on('dragover',function(e){
				e.preventDefault()
			})
			$('.temp').on('drop',function(e){
				$('.temp').remove()
				set=''
				let id=e.originalEvent.dataTransfer.getData('text')
				if($(this).attr('set')=='before'){
					$('#'+id).insertBefore(dropWh)
				} else{
					$('#'+id).insertAfter(dropWh)
				}
			})
		} 
	})
}
function _check(list) {
	_hint('Completed!')
    list.css({
            backgroundColor: 'lightgray',
            borderColor: 'gray'
        })
        .find('.line').animate({ opacity: '1' })

    list.animate({ opacity: '0' }, 400)

    let content = list.html(),
    	id=list.attr('id')

    setTimeout(function() {
        list.remove()
    }, 400)

    let newlist = $('.listArea').append('<p id="'+id+'" draggable="true">' + content + '</p>')
        .find('p').last()

    newlist.css({
            opacity: '0',
            backgroundColor: 'lightgray',
            borderColor: 'gray'
        }).animate({ opacity: '1' }).find('.line').css({ opacity: '1' })
    newlist.find('input').attr('checked',true).on('click',function(){
    	if ($(this).is(':checked'))//actually no way
            _check(newlist)
        else 
            _uncheck(newlist)
    })
    deleteList(newlist)
    dragEvent(newlist)
}

function _uncheck(list) {
  	_hint('Oops!')
    list.css({
            backgroundColor: 'lightgoldenrodyellow',
            borderColor: 'yellow'
        })
        .find('.line').animate({ opacity: '1' })

    list.animate({ opacity: '0' }, 400)

    let content = list.html(),
    	id=list.attr('id')

    setTimeout(function() {
        list.remove()
    }, 400)
    let newlist = $('.listArea').prepend('<p id="'+id+'" draggable="true">' + content + '</p>')
        .find('p').first()

    newlist.animate({ opacity: '1' }).find('.line').animate({opacity:'0'})
    newlist.find('input').attr('checked',false).on('click',function(){
    	if ($(this).is(':checked'))//actually no way
            _check(newlist)
        else 
            _uncheck(newlist)
    })
    deleteList(newlist)
    dragEvent(newlist)
}
function _hint(text){
	
	$('.hint').css({opacity:'0'}).text(text).animate({opacity:'1'})
	
}
