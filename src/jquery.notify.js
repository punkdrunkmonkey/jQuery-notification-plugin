/*
 * 			jQuery Notification Plugin
 *
 *  		A simple Ubuntu like notification plugin.
 * 			
 * 			By Aditya Rao
 * 
 * 			punkdrunkmonkey@gmail.com
 */

(function($) {
		
jQuery.fn.notify = function(options) {
				
				/* Getting default options */
				var aOpts = jQuery.extend({},jQuery.fn.notify.defaults,options);
				
				/* Creating the notification element */
				oNotification = document.createElement('div');
				oNotification.setAttribute('name','notificationDiv');
				
				/* Creating the notification's title */
				if(aOpts.title != '')
				{
					nTitle = document.createTextNode(aOpts.title);
					oTitle = document.createElement('span');
					oTitle.setAttribute('id', 'title');
					oTitle.appendChild(nTitle);
				
				/* Appending title to the notification */
				oNotification.appendChild(oTitle);
				
				/* break between title and message */
				oBrk = document.createElement('br');
				oNotification.appendChild(oBrk);
				
				}
				
				
				
				/* Creating the notification's message */
				nMessage = document.createTextNode(aOpts.message);
				
				/* Appending message to the notification */
				oNotification.appendChild(nMessage);
				
				/* Set appearence for the notification bubble */
				oNotification.className = "notification "+ aOpts.style;
				oNotification.style.display = "none";
				oNotification.style.zIndex = "9999";
				
				/* Calculate and set the position of the notification */
				oNotification.style.position = "absolute";
				aPos = aOpts.position.split("-");
				sVPos = aPos[0];
				sHPos = aPos[1];
				
				try{
				if(sVPos == "top"){
						oNotification.style.top = "2%";
					}else if(sVPos == "bottom"){
						 oNotification.style.bottom = "2%";
						}else{
								throw "Illegal parameter for vertical position.";
							}
				}catch(vErr)
				{
					console.error(vErr);
				}
				try{
				if(sHPos == "right"){
					 oNotification.style.right = "1%";
					}else if(sHPos == "left") {
							oNotification.style.left = "1%";
						}else{
									throw "Illegal parameter for horizontal position.";
							}
			   }catch(hErr)
			   {
					console.error(hErr);
			    }
				
				/* Render notification */			
				document.body.appendChild(oNotification);
				jQuery(oNotification).fadeIn("slow");
				setTimeout("jQuery(oNotification).fadeOut('slow',function(){jQuery(oNotification).remove();});",aOpts.timeOut);
				
			}
			
jQuery.fn.notify.defaults = {
				title:'',			 // Title of the notification.
				message: '',		// message to be shown.
				position: 'top-right', // position on screen.
				style: 'default',	  // style to apply.
				timeOut: '5000'		//	if not sticky , duration (in milliseconds) to remain on the screen.
			};
	})(jQuery)
