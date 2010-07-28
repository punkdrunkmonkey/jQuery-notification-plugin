/* jQuery Notification Plugin
 * A simple Ubuntu like notification plugin.
 * By Aditya Rao
 * punkdrunkmonkey@gmail.com
 */
(function($){
    jQuery.fn.notify = function(options){
        var aOpts = jQuery.extend({},jQuery.fn.notify.defaults,options);
        aPos = aOpts.position.split("-");
        sVPos = aPos[0];
        sHPos = aPos[1];
        if((sVPos != 'top' && sVPos != 'bottom') || (sHPos != 'left' && sHPos != 'right')){
            debug("Illegal parameter for Vertical and/or Horizontal position for notification.");
        }else{
            iVPosition = "2%";
            sNotificationName = sVPos+"_notificationDiv";
            oLatestNotification = jQuery('div[name='+sNotificationName+']:last');
            if(oLatestNotification.length > 0){
                if(sVPos == "top"){
                    iVPosition = oLatestNotification.offset().top + oLatestNotification.outerHeight() + 5 + "px";
                }else{
                    iVPosition = (oLatestNotification.offset().top - oLatestNotification.outerHeight() - 5) + "px";
                }
            }
			
            oNotification = document.createElement('div');
            oNotification.setAttribute('name',sNotificationName);
            
            if(aOpts.sticky == true)
            {
				oNotification.setAttribute('id','stickyNotification');
				jQuery(oNotification).click(function(){jQuery(this).fadeOut(aOpts.timeOut,function(){jQuery(this).remove()});});
			}
				
            oNotificationText = document.createElement('div');
            oNotificationText.setAttribute('id','text');
            oNotificationText.style.float = "left";
				
            if(aOpts.title !=''){
                oNotificationTitle = document.createElement('div');
                nTitle = document.createTextNode(aOpts.title);
                oTitle = document.createElement('span');
                oTitle.setAttribute('id', 'title');
                oTitle.appendChild(nTitle);
                oNotificationTitle.appendChild(oTitle);
                oNotificationText.appendChild(oNotificationTitle);
            }
				
            oNotificationMessage = document.createElement('div');
            oNotificationMessage.innerHTML = aOpts.message;
            oNotificationText.appendChild(oNotificationMessage);
				
            if(aOpts.icon != null)
            {
                oNotificationIcon = document.createElement('div');
                if(aOpts.icon == ''){
                    oNotificationIcon.setAttribute('id','icon');
                }else{
                    oNotificationIcon.setAttribute('id','icon');
                    oNotificationIcon.style.background = 'url('+ aOpts.icon +') no-repeat scroll 0 0';
                }
                oNotification.appendChild(oNotificationIcon);
            }
				
            oNotification.appendChild(oNotificationText);
				
            oNotification.className = "notification "+ aOpts.style;
            oNotification.style.position = "absolute";
            oNotification.style.display = "none";
            oNotification.style.zIndex = "9999";
				
            document.body.appendChild(oNotification);
            jQuery(oNotification).fadeIn("slow");
				
            if(sVPos == "top"){
                oNotification.style.top = iVPosition;
            }else{
                if(iVPosition != "2%"){
                    oNotification.style.top = iVPosition;
                }else{
                    oNotification.style.bottom = iVPosition;
                }
            }
            if(sHPos == "left"){
                oNotification.style.left = "1%";
            }else{
                oNotification.style.right = "1%";
            }
				
            jQuery("div[name="+sNotificationName+"]:not('#stickyNotification')").each(function(){
                jQuery(this).delay(aOpts.timeOut);
                jQuery(this).fadeOut(aOpts.timeOut,function(){
                    jQuery(this).remove();
                }).delay(aOpts.timeOut);
            });
        }
    }
    jQuery.fn.notify.defaults = {
        title:'',			/* notification's title		*/
        message:'',			/* notification's message	*/
        icon:'',			/* notifications's icon		*/
        position:'top-right',		/* notification's position	*/
        style:'default',		/* notification's style		*/
        timeOut:'5000',			/* notification's appearance duration(in milliseconds)*/
        sticky:false			/* if notification is sticky or not.*/
    };
    function debug(msg){
        if (window.console && window.console.error){
            window.console.error(msg);
        }
    }
})(jQuery)
