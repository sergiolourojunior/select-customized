$(document).ready(function(){
	var mobile = ($(this).width()<=440);
	var select = $('.select-custom');
	var select_name = select.attr('name');
	var select_value = select.val();
	var select_text = select.find('option[value="'+select_value+'"]');
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
			var li = $(el).val()==select_value?'li class="active"':'li';
			list_customized.append('<'+li+' data-value="'+$(el).val()+'">'+$(el).text()+'</li>');
		} else if(el.tagName=='OPTGROUP') {
			list_customized.append('<li class="lab">'+$(el).attr('label'));
			$(el).find('option').each(function(i, e){
				var li_sub = $(e).val()==select_value?'active':'';
				list_customized.append('<li class="sub '+li_sub+'" data-value="'+$(e).val()+'">'+$(e).text()+'</li>');
			});
			list_customized.append('</li>');
		}
	});
	var select_text = list_customized.find('.active').text();
	content.find('span').html(select_text);
	content.on('click', function(){
		$(this).toggleClass('open');
	});
	content.find('li').not('.lab').on('click', function(){
		var t = $(this);
		var value = t.data('value');
		var text = t.text();
		content.find('span').html(text);
		content.find('input[type=hidden]').val(value);
		content.find('li.active').removeClass('active');
		t.addClass('active');
	});
});