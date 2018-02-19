$(document).ready(function(){
	var mobile = ($(this).width()<=440);
	var select = $('.select-custom');
	var select_name = select.attr('name');
	var select_value = select.val();
	var select_text = select.find('option[value="'+select_value+'"]');
	var value_form = '';
	var multiple = select.data('multiple')==true?true:false;
	select.attr('name', '');
	select.css('display', 'none');
	select.after('<div class="list-customized-content" data-origin="'+select_name+'"></div>');
	var content = $('.list-customized-content[data-origin="'+select_name+'"]');
	content.append('<input type="hidden" name="'+select_name+'" value="'+select_value+'">');
	content.append('<div class="list-customized-text"><span></span><i class="fa fa-chevron-down"></i></div>');
	content.append('<ul id="list-customized"></ul>');
	var list_customized = content.find('#list-customized');
	select.children().each(function(index, el){
		if(el.tagName=='OPTION'){
			if(multiple){
				var li = $(el).attr('selected')?'li class="active"':'li';
			} else {
				var li = $(el).val()==select_value?'li class="active"':'li';
			}
			list_customized.append('<'+li+' data-value="'+$(el).val()+'"><i class="fa fa-fw fa-check"></i>'+$(el).text()+'</li>');
		} else if(el.tagName=='OPTGROUP') {
			list_customized.append('<li class="lab">'+$(el).attr('label'));
			$(el).find('option').each(function(i, e){
				var li_sub = $(e).val()==select_value?'active':'';
				list_customized.append('<li class="sub '+li_sub+'" data-value="'+$(e).val()+'"><i class="fa fa-fw fa-check"></i>'+$(e).text()+'</li>');
			});
			list_customized.append('</li>');
		}
	});
	
	if(multiple){
		var val_hidden;
		list_customized.find('.active').each(function(index, el){
			if(index==0) {
				content.find('span').html($(el).text());
				val_hidden = $(el).data('value');
			} else {
				content.find('span').append(', '+$(el).text());
				val_hidden+= ','+$(el).data('value');
			}
		});
		content.find('input[type=hidden]').val(val_hidden);
	} else {
		var select_text = list_customized.find('.active').text();
		content.find('span').html(select_text);
	}
	if(multiple) {
		$('.list-customized-text').on('click', function(){
			console.log(this);
			$(this).parents('.list-customized-content').toggleClass('open');
		});
	} else {
		content.on('click', function(){
			$(this).toggleClass('open');
		});
	}
	content.find('li').not('.lab').on('click', function(){
		var t = $(this);
		var value = t.data('value');
		var text = t.text();
		if(multiple){
			t.toggleClass('active');
			content.find('li.active').each(function(index, e){
				if(index==0){
					value_form=$(e).data('value');
					content.find('span').html($(e).text());
				} else {
					value_form+=','+$(e).data('value');
					content.find('span').append(', '+$(e).text());
				}
			});
			content.find('input[type=hidden]').val(value_form);
		} else {
			content.find('span').html(text);
			content.find('input[type=hidden]').val(value);
			content.find('li.active').removeClass('active');
			t.addClass('active');
		}
	});

	$.fn.addOption = function(text, value, selected=false){
		if(multiple) {
			var li = selected?'li class="active"':'li';
			list_customized.append('<'+li+' data-value="'+value+'"><i class="fa fa-fw fa-check"></i>'+text+'</li>');
		} else {
			list_customized.append('<li data-value="'+value+'"><i class="fa fa-fw fa-check"></i>'+text+'</li>');
		}
	}
});