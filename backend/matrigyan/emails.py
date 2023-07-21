# coding: utf-8

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.template.defaultfilters import urlize, urlizetrunc

from slugify import slugify
import time

from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.utils.timezone import now
import pytz



def check_to_send_application_status_email(writer, status):
    if status == 'active':
        # send_application_approved_email(guser)
        send_account_approved_email_to_writer(writer)
    elif status == 'rejected':
        # send_application_rejected_email(guser)
        send_application_rejected_email(writer.guser)
    else:
        pass


# send email to freelance writer when the application is approved
def send_application_approved_email(guser):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    reply_email = get_reply_to_email()
    subject = 'Narrato - Your application is approved'
    from_email = get_from_email()
    writer_site_url = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'writer-login">'+R_SITE_URL+'writer-login</a>'
    body = """<p """+EMAIL_P_STYLE+""">Congratulations! Your application for freelance writer on Narrato is approved. You can now start picking the jobs and kick start your writing here - """ + writer_site_url + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


# send email to freelance writer when the application is rejected
def send_application_rejected_email(guser):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    reply_email = get_reply_to_email()
    subject = 'Narrato - Your application is rejected'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">We are sorry to inform you that your application is rejected as the sample content did not meet editorial expectations.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})    
    record_web_notification(guser, subject, html_content)
    msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


# writer welcome mail
def send_freelance_welcome_email(guser):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    reply_email = get_reply_to_email()
    subject = 'Application under review'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Thank you for your interest in joining the leading freelance jobs portal for writers.</p>
                <p """+EMAIL_P_STYLE+""">
                   Your application is under review and we'll get back to you soon on the outcome.
                </p>
                <p """+EMAIL_P_STYLE+"""> Please feel free to check the status of your account by signing in about 10-14 days time.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


# writer welcome mail for accounts created by internal user
def send_freelance_login_details_email(guser, password):
    first_name, to_email = get_first_name_and_to_email(guser)
    user_email = guser.email
    bcc_email = get_bcc_email()
    reply_email = get_reply_to_email()
    pswd_text = "Password: " + password if password else ""
    subject = 'Welcome to Narrato Marketplace'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Welcome to Narrato Marketplace! You can access your Narrato freelance writer account and dashboard using the following login details:</p>
                <p """+EMAIL_P_STYLE+""">
                   <a """+EMAIL_A_STYLE+""" href='"""+R_SITE_URL+"""writer-login'>Narrato.io</a> <br>
                   Username: """ + user_email + """<br>
                   """ + pswd_text + """
                </p>
                <p """+EMAIL_P_STYLE+""">Please note that you can change your password anytime using the 'Reset Password' option from the Profile section in the top menu (top right dropdown) on login.</p>
                <p """+EMAIL_P_STYLE+""">Key features and guidelines:</p>
                <ul>
                    <li """+EMAIL_LI_STYLE+""">Each job will be 1 article or content piece and you will have 24 hours to complete the job after picking (post which the job will no longer be available).</li>
                    <li """+EMAIL_LI_STYLE+""">In case a revision is requested, you'll again have 24 hours to revise and submit content piece.</li>
                    <li """+EMAIL_LI_STYLE+""">A job success rate is measured (accepted jobs/total jobs picked), which is publicly viewable.</li>
                </ul>
                <p """+EMAIL_P_STYLE+""">Please feel free to reach out to us if you have any questions. We very much look forward to working with you.</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


# freelance client welcome email
def send_freelance_client_welcome_email(guser):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = 'Welcome to Narrato Marketplace'
    from_email = get_from_support_email()
    trial_order_url = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'client/trial-order">'+'do so today'+'</a>'
    body = """<p """+EMAIL_P_STYLE+""">Welcome to Narrato Marketplace - the smart freelance writer marketplace and content platform.</p>
                    <p """+EMAIL_P_STYLE+""">A few platform features you'll love:</p>
                    <ul>
                      <li """+EMAIL_LI_STYLE+""">Unlimited revisions, fast turnarounds</li>
                      <li """+EMAIL_LI_STYLE+""">Advanced writer matching algorithms to get you the best writer for the job</li>
                      <li """+EMAIL_LI_STYLE+""">Free images and automatic plagiarism checks</li>
                      <li """+EMAIL_LI_STYLE+""">Large, high quality network of carefully chosen writers across industries</li>
                      <li """+EMAIL_LI_STYLE+""">In-line commenting on content for feedback to enhance content collaboration</li>
                      <li """+EMAIL_LI_STYLE+""">And a number of content management features to keep your projects organized</li>
                    </ul>
                <p """+EMAIL_P_STYLE+""">If you haven’t placed your trial order with a 50% discount yet, </p>
                """+get_btn_for_email('Do so today!', R_SITE_URL+'client/place-order')+"""
                <p """+EMAIL_P_STYLE+""">We hope Narrato becomes your content partner of choice for all your content projects now and in the future. Please feel free to say hello! We are happy to answer any of your questions, and get your valuable feedback and suggestions.</p>
                """+patrik_sign_off(guser, 0)+""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


def send_trial_order_created_email(project):
    project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    project_details_link = '<a href="'+project_link+'">'+project_description+'</a>'
    project_fee_currency = get_currency_icon_from_currency_code(project.currency) + str(project.project_fee)
    from_email = get_from_support_email()
    subject = 'Trial order has been placed'
    if project.service_type.lower() == "managedservice":
        to_email = get_managed_service_to_email()
        service_type_text = "<p>P.S: Service Type - Managed Service.</p>"
    else:
        to_email = ['sales@godotmedia.com', 'work@narrato.io']
        service_type_text = "<p>P.S: Service Type - Marketplace (freelance).</p>"
    # to_email = ['rm9060@gmail.com', 'santosh.bagalkot@godotmedia.com']
    bcc_email = ['raghav@narrato.io']
    body = """<html><body>
            <div>
                <p>Hi there!,<br></p>
                <p>There's a new trial order on Narrato - """+project_details_link+"""<br></p>
                """+ service_type_text + narrato_team_sign_off(False) +"""
            </div>
            </body></html>"""
    html_content = body
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


# Order email - based on project status for clients only
def send_order_email_based_on_project_status_to_freelance_client(project):
    guser = project.user
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = ''
    from_email = get_from_support_email()
    # reply_email = get_reply_to_email()
    body = ""

    if project.status == "work in progress":
        login_to_url = '<a href="'+R_SITE_URL+'marketplace?md=21">'+'your dashboard</a>'
        track_orders_link = R_SITE_URL + 'client/track-orders'
        project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
        order_page_link = project_link
        subject = "Your order is now live"
        body = """<p """+EMAIL_P_STYLE+""">Thank you for placing your order. Your order is now live and the jobs are visible to the matched writers.</p>
                    <p """+EMAIL_P_STYLE+""">
                       """ + get_project_title(project, include_email=False) + """
                    </p>
                    <p """+EMAIL_P_STYLE+""">Here’s what happens next:</p>
                    <ol>
                        <li """+EMAIL_LI_STYLE+""">Writers will start picking and delivering the individual content jobs typically in 24-48 hours or less. Some content projects however may take a little longer.</li>
                        <li """+EMAIL_LI_STYLE+""">You’ll get content delivery updates as dashboard notifications and emails. You can also track your order status from the <a """+EMAIL_A_STYLE+""" href='"""+ track_orders_link +"""'>Track Orders</a> page.</li>
                        <li """+EMAIL_LI_STYLE+""">Once delivered, you can review, request revision or/and download your content from the <a """+EMAIL_A_STYLE+""" href='"""+ order_page_link +"""'>Order page</a>.</li>
                    </ol>
                    <p """+EMAIL_P_STYLE+""">Please feel free to write in to the Narrato Support team if you have any questions.</p>
                    """+ narrato_team_sign_off(guser) +""""""
    elif project.status == "pending project specs":
        project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
        subject = "Please add guidelines for project - " + project.project_code               
        body = """<p """+EMAIL_P_STYLE+""">Thank you for placing a new content order: """+ get_project_title(project, include_email=False) +"""</p>
                    <p """+EMAIL_P_STYLE+""">
                       Please complete project guidelines/specifications to kick start your content order.
                    </p>
                    """+get_btn_for_email('Add Project Guidelines', project_link)+"""
                    """+ narrato_team_sign_off(guser) +""""""
    elif project.status == "pending topics selection":
        subject = "Your order " + project.project_code + " is successfully placed"
        body = """<p """+EMAIL_P_STYLE+""">Thank you for placing a new content order: """ + get_project_title(project, include_email=False) + """</p>
                    <p """+EMAIL_P_STYLE+""">We are working on suggesting some awesome topics for your project - expect to hear from us soon!</p>
                    """+ narrato_team_sign_off(guser) +""""""

    elif project.status == "pending topics approval":
        project_code, project_url, project_details_link, project_description = get_project_code_project_link(project, freelance=True)
        approve_topics_url = '<a '+EMAIL_A_STYLE+' href="'+ project_details_link +'">'+"approve the topics"+'</a>'
        subject = "Please approve topics for project - " + project.project_code
        body = """<p """+EMAIL_P_STYLE+""">The topics for your recently ordered project """ + get_project_title(project, include_email=False) + """ are ready to review and approve. Please approve the topics to kick start the project.</p>
                    """+get_btn_for_email('Approve Topics', project_details_link)+"""
                    """+ narrato_team_sign_off(guser) +""""""

    elif project.status == "closed":
        project_code, project_url, project_details_link, project_description = get_project_code_project_link(project, freelance=True)
        subject = "Your order " + project.project_code + " has been marked closed"
        body = """<p """+EMAIL_P_STYLE+""">Your order """ + get_project_title(project, include_email=False) + """ has been marked closed and completed.  If you haven't already, please do rate the writers' work so we can incorporate your feedback to connect you to the best writers for your future orders.</p>
                    """+get_btn_for_email('Rate Writers', project_details_link)+"""
                    <p """+EMAIL_P_STYLE+""">We are looking forward to your <a """+EMAIL_A_STYLE+""" href=\""""+R_SITE_URL+"""client/place-order\">next order</a> soon.</p>
                    """+ narrato_team_sign_off(guser) +""""""            

    # sender block
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email, reply_to=reply_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


def prepare_and_send_batch_of_content_delivered_email_to_freelance_client(project_id):
    project = Project.objects.get(id=project_id)
    guser = project.user
    task_list = get_task_list_for_deliverable_content(project)
    if not task_list:
        return
    send_content_delivered_email_to_freelance_client(guser, project, task_list)


def get_task_list_for_deliverable_content(project):
    task_array = []
    # file upload deliveries
    # delivery_attachments = DeliveryAttachments.objects.filter(task__project=project, delivered=False).order_by('id')
    # for attachment in delivery_attachments:
    #     attachment.delivered = True
    #     attachment.save()
    #     task = attachment.task
    #     task_array.append(task)
    # # Google doc link deliveries
    # delivery_google_links = DeliveryGoogleLinks.objects.filter(task__project=project, delivered=False).order_by('id')
    # for attachment in delivery_google_links:
    #     attachment.delivered = True
    #     attachment.save()
    #     task = attachment.task
    #     task_array.append(task)

    quill_delivery_attachments = QuillJobDelivery.objects.filter(task__project=project, delivered=False, status='delivered').order_by('task_id')
    for attachment in quill_delivery_attachments:
        attachment.delivered = True
        attachment.save()
        task = attachment.task
        task_array.append(task)
    task_array = list(set(task_array))
    return task_array


def send_content_delivered_email_to_freelance_client(guser, project, task_list):
    # content builder block open
    project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    list_generator = ""
    for task in task_list:
        task_details = get_task_code_description_writer_name_for_task(task)
        if task_details:
            list_generator += '<li '+EMAIL_LI_STYLE+' >' + task_details + '</li>'
    if not list_generator:
        return
    list_generator = '<ul>'+ list_generator +'</ul>'
    # content builder block close

    # button block open
    view_order_page_btn = """<a href='""" + project_link + """';" style="font-size: 16px; padding: 10px; background-color: #00a680; border-color: #00a680; border-radius: 5px; text-align: center; white-space: nowrap; border: aliceblue; color: #ffffff; text-decoration: none;">View Order Page</a>"""
    # button block close

    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = "Content delivered for your order - " + project.project_code
    from_email = get_from_support_email()
    body = """<p """+EMAIL_P_STYLE+""">Content has been delivered for your order. Please visit the order page to review the content. You’ll be able to accept, download, or request changes from there.</p>
                <p style="text-align-last: center; margin-top: 30px; margin-bottom: 30px;">"""+ view_order_page_btn +"""</p>
                <p """+EMAIL_P_STYLE+""">
                    Delivered Jobs:
                </p>
                """+ list_generator +"""
                <p """+EMAIL_P_STYLE+""">Please note that the jobs will be automatically marked accepted if the job status is not updated by you within """+str(JOB_AUTO_ACCEPT_DAYS)+""" days.</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


def check_to_send_first_content_delivered_to_freelance_client(task_id):
    task = Task.objects.filter(id=task_id).first()
    if task:
        counter = QuillJobDelivery.objects.filter(task__project__user=task.project.user).exclude(status='saved').count()
        if counter == 1:
            if not RejectedQuillJobDelivery.objects.filter(task=task, status__in=['revision requested', 'rejected']).exists():                
                project = Project.objects.get(id=task.project.id)
                guser = project.user
                task_list = [task]# get_task_list_for_deliverable_content(project)
                if not task_list:
                    return
                send_first_content_delivered_email_to_freelance_client(guser, project, task_list)




def send_first_content_delivered_email_to_freelance_client(guser, project, task_list):
    # content builder block open
    project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    list_generator = ""
    for task in task_list:
        task_details = get_task_code_description_writer_name_for_task(task)
        if task_details:
            list_generator += '<li '+EMAIL_LI_STYLE+' >' + task_details + '</li>'
    if not list_generator:
        return
    list_generator = '<ul>'+ list_generator +'</ul>'
    # content builder block close

    # button block open
    view_order_page_btn = """<a href='""" + project_link + """';" style="font-size: 16px; padding: 10px; background-color: #00a680; border-color: #00a680; border-radius: 5px; text-align: center; white-space: nowrap; border: aliceblue; color: #ffffff; text-decoration: none;">View Order Page</a>"""
    # button block close

    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = "First content delivered for your order - " + project.project_code
    from_email = get_from_support_email()
    body = """<p """+EMAIL_P_STYLE+""">Content delivery has kicked off on your order. Please visit the order page to review the content. You’ll be able to accept, download, or request changes from there.</p>
                <p style="text-align-last: center; margin-top: 30px; margin-bottom: 30px;">"""+ view_order_page_btn +"""</p>
                <p """+EMAIL_P_STYLE+""">
                    Delivered Job:
                </p>
                """+ list_generator + """
                <p """+EMAIL_P_STYLE+""">Please note that the jobs will be automatically marked accepted if the job status is not updated by you within """+str(JOB_AUTO_ACCEPT_DAYS)+""" days.</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)



# def get_task_code_description_writer_name_for_task(task):
#     writer_job = WriterJobs.objects.filter(job=task).first()
#     if writer_job:        
#         writer = writer_job.writer
#         # writer_name = writer.guser.first_name
#         # writer_profile = WriterProfile.objects.filter(writer=writer).first()
#         # if writer_profile:
#         #     pen_name = writer_profile.pen_name if writer_profile.pen_name else writer_name
#         # else:
#         #     pen_name = writer_name
#         pen_name = get_writer_pen_name(writer, writer.guser)
#         task_description = get_task_description(task)
#         statement = task.task_code + " - " + task_description + " by " + pen_name
#     else:
#         statement = ""
#     return statement


def get_task_code_description_writer_name_for_task(task):
    writer = Writer.objects.filter(guser=task.writer).first()
    if writer:
        writer_guser = writer.guser
        project_guser = task.project.user
        pen_name = get_writer_pen_name(writer, writer_guser) if project_guser.user_type == 'client' else get__writer_original_name(writer_guser, False)
        task_description = get_task_description(task)
        statement = task.task_code + " - " + task_description + " by " + pen_name
    else:
        statement = ""
    return statement


def send_writer_selected_by_client_for_project_email(writer, project):
    project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = 'You have been selected by client for project ' + project_code
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">The client has selected you as a preferred writer for the project - """+project_description+""". Please pick the jobs asap while they are exclusively offered to you. The jobs will get released to a wider pool of writers in 48 hours and may no longer be available.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    prepare_and_send_writer_selected_for_project_notification(guser, project_code, project_description)
    if(is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value)):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)


def send_task_revision_requested_email(task, feedback=''):
    guser = task.writer
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    task_code = task.task_code
    task_revision_deadline = get_local_time(task.deadline)
    # reply_email = get_reply_to_email()
    subject = 'Revision requested for job - ' + task_code
    from_email = get_from_email()
    revision_request_default_text = 'REVISION REQUEST FOR ' + task_code
    feedback = feedback.replace(revision_request_default_text, "").strip().strip(':')
    client_feedback = ''
    if feedback:
        client_feedback += '<p '+EMAIL_P_STYLE+'><b>' + 'Revision Request Notes:' + '</b></p>'
        client_feedback += '<p '+EMAIL_P_STYLE+'>' + feedback + '</p>'
        
    body = """<p """+EMAIL_P_STYLE+""">A revision has been requested for job """+ task_code +""". Please update and send the revised content piece asap. Your deadline for revision is """+task_revision_deadline+""" after which the job would be marked automatically rejected.</p>
                """+ client_feedback +"""
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    prepare_and_send_job_revision_requested_notification(guser, task_code, task_revision_deadline, task.id)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


def send_task_picked_email(task):
    guser = task.writer
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    task_code = task.task_code
    task_description = get_task_description(task)
    task_deadline = get_local_time(task.deadline)
    # reply_email = get_reply_to_email()
    subject = 'Job ' + task_code + ' assigned to you'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">The job """+task_code+""" """+task_description+""" is assigned to you.</p>
                <p """+EMAIL_P_STYLE+""">Please complete the content piece and deliver by """+task_deadline+""" after which the job will be automatically released.</p>
                <p """+EMAIL_P_STYLE+""">Please also note that the job completion rate is actively monitored and if it is lower than an acceptable threshold, your writer account can get permanently blocked for future jobs.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""

    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    prepare_and_send_job_picked_notification(guser, task_code, task_description, task_deadline)

    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)


def send_task_expired_email(task):
    guser = task.writer
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    task_code = task.task_code
    task_description = get_task_description(task)
    task_deadline = get_local_time(task.deadline)
    # reply_email = get_reply_to_email()
    subject = 'Job ' + task_code + ' has expired and no longer available to you'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">The deadline for job """+task_code+""" """+task_description+""" is passed and the job is no longer available to you.</p>
                <p """+EMAIL_P_STYLE+""">Please also note that the job completion rate is actively monitored and if it is lower than an acceptable threshold, your writer account can get permanently blocked for future jobs.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    prepare_and_send_job_expired_notification(guser, task_code, task_description)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)    


def send_task_acceptance_email(task):
    guser = task.writer
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    task_code = task.task_code
    task_description = get_task_description(task)
    task_deadline = get_local_time(task.deadline)
    your_jobs_page_link = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'freelance/available-jobs">jobs</a>'
    subject = 'Job ' + task_code + ' accepted and earnings accrued'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Congratulations! Your job """+task_code+""" """+task_description+""" has been accepted and the earnings have accrued in your account.</p>
                <p """+EMAIL_P_STYLE+""">Time to pick up new """+ your_jobs_page_link +"""!</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    prepare_and_send_job_acceptance_notification(guser, task_code, task_description)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)


# Job rated email to writer
def send_task_rated_email(task):
    guser = task.writer
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    task_code = task.task_code
    task_description = get_task_description(task)
    your_jobs_page_link = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'freelance/available-jobs">jobs</a>'
    job_ratings = str(round(task.rating)) + '/5'
    subject = 'Job ' + task_code + ' rated ' + job_ratings
    from_email = get_from_email()
    if task.rating > 3:
        body = """<p """+EMAIL_P_STYLE+""">Congratulations! Your job """+task_code+""" """+task_description+""" has been rated """+ job_ratings +""". Keep up the good work.</p>
                    <p """+EMAIL_P_STYLE+""">Time to pick up new """+ your_jobs_page_link +"""!</p>
                    <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                    """+ narrato_team_sign_off(guser) +""""""
    else:
        body = """<p """+EMAIL_P_STYLE+""">Your job """+task_code+""" """+task_description+""" has been rated """+ job_ratings +""".</p>
                    <p """+EMAIL_P_STYLE+""">Time to pick up new """+ your_jobs_page_link +"""!</p>
                    <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                    """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    prepare_and_send_job_rated_notification(guser, task_code, task_description, task.rating)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


def send_task_rejection_email(task, reason=""):
    guser = task.writer
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    task_code = task.task_code
    task_description = get_task_description(task)
    task_deadline = get_local_time(task.deadline)
    your_jobs_page_link = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'freelance/available-jobs">'+'jobs</a>'
    subject = 'Job ' + task_code + ' rejected'
    from_email = get_from_email()
    reason_text = '<p '+EMAIL_P_STYLE+'>Reason for rejection stated by client: ' + reason + '</p>' if reason else ""
    if reason == 'copyscape_exceeded':
        body_text = """<p """+EMAIL_P_STYLE+""">We are sorry to let you know that your job """+task_code+""" """+task_description+""" - has been rejected as it did not clear the plagiarism check.</p>
                <p """+EMAIL_P_STYLE+""">You can pick and work on other """ + your_jobs_page_link +""" though.</p>
                """
    else:
        body_text = """<p """+EMAIL_P_STYLE+""">We are sorry to let you know that the client has rejected your job """+task_code+""" """+task_description+""". </p>
                <p """+EMAIL_P_STYLE+""">You can pick and work on other """ + your_jobs_page_link +""" though. Better luck next time!</p>
                """ + reason_text
    body = """""" + body_text + """
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""

    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    
    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    prepare_and_send_job_rejection_notification(guser, task_code, task_description, reason=reason)

    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)    



# Payment Emails follow below

#Invoice ready - please check and raise. Issues - write to Support from site.

def send_invoice_ready_please_check_and_raise_email_to_writer(writer_invoice):
    payment_threshold = WRITER_EARNINGS_THRESHOLD[writer_invoice.currency.upper()]
    payment_threshold = f'{writer_invoice.currency.upper()} {payment_threshold}'
    guser = writer_invoice.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    month = writer_invoice.invoice_date.strftime('%b %Y')
    invoice_page_link = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'freelance/payments-due">'+'your confirmation</a>'

    subject = 'Your invoice for '+month+' is ready for review'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Your invoice for the month of """+ month +""" is ready for review. Please raise the invoice by clicking """ + invoice_page_link + """ to allow us to process the payment for the month.</p>
                <p """+EMAIL_P_STYLE+""">In case of any questions or issues with the invoice, write to our Support team by logging in to the platform.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                <p """+EMAIL_P_STYLE+""">P.S.: Please note that a minimum amount of """ + payment_threshold + """ is needed to release the monthly payment.</p>
                """+ narrato_team_sign_off(guser) +""""""

    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.8)


def send_payment_processed_email_to_writer(writer_invoice):
    writer = Writer.objects.get(guser=writer_invoice.guser)
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    month = writer_invoice.invoice_date.strftime('%B')
    net_amount = writer_invoice.net_amount

    subject = 'Your payment for '+month+' has been processed'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Your payment """ + writer_invoice.currency.upper() + " " + str(net_amount) +""" for the month of """+ month +""" has been processed.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)



# Profile/Account Emails below
def send_skill_verification_email_to_writer(verified_skill):
    writer = verified_skill.writer
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    writer_skill = None
    if verified_skill.content_type:
        writer_skill = verified_skill.content_type.content_type
    elif verified_skill.category:
        writer_skill = verified_skill.category.category
    else:
        writer_skill = ''
    # subject = 'Your skill is verified and approved'
    subject = 'Skill approved - ' + writer_skill
    from_email = get_from_email()
    body = """<html><body>
            <div>
                <p>Hi """ + first_name + """,<br></p>
                <p>Congratulations! Your skill """+ writer_skill +""" has been reviewed and approved. You will now have access to jobs posted under this skill type.<br></p>
                <p style="color:#777">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +"""
            </div>
            </body></html>"""
    
    record_web_notification(guser, subject, body)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    html_content = body
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()



# rejected skill verification email
def send_rejected_skill_verification_email_to_writer(verified_skill):
    writer = verified_skill.writer
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    writer_skill = None
    if verified_skill.content_type:
        writer_skill = verified_skill.content_type.content_type
    elif verified_skill.category:
        writer_skill = verified_skill.category.category
    else:
        writer_skill = ''
    subject = 'Skill reviewed - ' + writer_skill
    from_email = get_from_email()
    body = """<html><body>
            <div>
                <p>Hi """ + first_name + """,<br></p>
                <p>Your skill """+ writer_skill +""" has been reviewed. However, the sample submitted for the skill did not meet our required standards.<br></p>
                <p style="color:#777">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +"""
            </div>
            </body></html>"""
    
    record_web_notification(guser, subject, body)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    html_content = body
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()



def send_account_approved_email_to_writer(writer):
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    pick_jobs_link = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'freelance/available-jobs">'+'pick jobs</a>'

    subject = 'Your freelancer account is approved and ready to use'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Congratulations! Your application to work as a freelance writer on our platform has been approved. You can now """+ pick_jobs_link +""" and start earning by logging in to the platform.</p>
                <p """+EMAIL_P_STYLE+""">
                    Also, remember to:
                </p>
                <ul>
                  <li """+EMAIL_LI_STYLE+""">Add your payment and tax details to get paid every month</li>
                  <li """+EMAIL_LI_STYLE+""">Update your pen name and profile details - your profile is viewable by clients and can help you get more jobs</li>
                </ul>
                <p """+EMAIL_P_STYLE+""">Please note that the writer account is initially approved at Level 1. Once you complete a minimum of 3 jobs successfully, you will be eligible for review of the work done on the platform and consideration to get an upgrade to Levels 2, 3 and 4. The higher levels give you access to higher paying jobs posted only at those levels.</p>
                <p """+EMAIL_P_STYLE+""">In case of any questions, refer to our """+ '<a '+EMAIL_A_STYLE+' href="' + R_SITE_URL + 'freelance/writer-faq">' + 'Writer-FAQ' + '</a>' +""" or reach out to Support from the platform.</p>
                <p """+EMAIL_P_STYLE+""">Good luck and happy freelancing!</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>          
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


def send_account_blocked_email_to_writer(writer):
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    subject = 'Your freelancer account has been blocked'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Your freelance writer account has been blocked as your job success rate has dropped below the threshold 40%. Please note that job success rate takes into account jobs accepted, rejected and not completed (deadline passed).</p>
                <p """+EMAIL_P_STYLE+""">You can reach out to Support after logging in to your account in case you would like to dispute the action.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    
    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


def send_writer_level_upgrade_email_to_writer(writer):
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    from_email = get_from_email()
    # reply_email = get_reply_to_email()
    subject = 'Your writer account has been upgraded to Level ' + str(writer.level)
    body = """<p """+EMAIL_P_STYLE+""">Congratulations! We have recently reviewed your work on the Narrato platform and are pleased to inform that your writer account has been upgraded to Level """+str(writer.level)+""". This means you'll now have access to a larger number of higher paying jobs.</p>                
                <p """+EMAIL_P_STYLE+""">Keep up the great work!</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>          
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


def send_job_acceptance_or_completion_rate_diping_email_to_writer(writer):
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    subject = 'Your job success rate is close to threshold - prevent your account from getting blocked'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">Your job success rate is running low. If it dips below 40%, your account will get blocked and you will not be able to pick any more jobs.</p>
                <p """+EMAIL_P_STYLE+""">To prevent this from happening, please follow your job guidelines carefully and submit high quality work within the deadline.</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    prepare_and_send_job_acceptance_or_completion_rate_diping_notification(guser)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


# Available Jobs Emails
def check_if_input_is_250th_interval(input_number):
    if (input_number % 250) == 0:
        return True
    else:
        return False


# Available jobs daily email - triggered when jobs available for a writer
def send_available_jobs_emails_to_writer(writer, job_title_link_array):
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = []
    if check_if_input_is_250th_interval(guser.id):
        bcc_email = get_bcc_email()
    # reply_email = get_reply_to_email()
    # list builder open
    list_generator = '<ul>'
    for dictionary in job_title_link_array:
        list_generator += '<li '+EMAIL_LI_STYLE+'>' + get_display_element_for_job_title_job_page_link(dictionary) + '</li>'
    list_generator += '</ul>'
    # list builder close
    # available jobs link
    pick_jobs_link = '<a '+EMAIL_A_STYLE+' href="'+R_SITE_URL+'freelance/available-jobs">'+ R_SITE_URL +'freelance/available-jobs</a>'
    subject = 'New jobs to pick'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+""">
                    New jobs are now available for you to pick from:
                </p>
                """+ list_generator +"""
                <p """+EMAIL_P_STYLE+""">See More Jobs """+pick_jobs_link+"""</p>
                <p """+EMAIL_P_STYLE+""">Happy freelancing!</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # msg = EmailMessage(subject, html_content, from_email, to_email, reply_to=reply_email, bcc=bcc_email)
    # send the notification for android
    prepare_and_send_available_jobs_notification(guser, subject, job_title_link_array)
    # print(user_email)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.DAILY_JOBS.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(1)


def get_display_element_for_job_title_job_page_link(dictionary):
    display_text = dictionary['display_text']
    job_details_page_link = dictionary['job_details_page_link']
    return_element = '<a '+EMAIL_A_STYLE+' href="'+ job_details_page_link +'">'+ display_text +'</a>'
    return return_element


def get_writer_login_link():
    login_link = 'Writer login: <a '+EMAIL_A_STYLE+' href="' + R_SITE_URL + 'writer-login">' + R_SITE_URL + 'writer-login' + '</a>'
    return ''


# send email to internal tem when copyscape gets fail
def send_copyscape_failure_email(error):
    to_email = ['sophias@godotmedia.com', 'raghav@narrato.io', 'work@narrato.io']
    subject = 'Copyscape check failed'
    from_email = get_from_support_email()
    body = """<html><body>
            <div>
                <p>Hi there!</p>
                <p>Copyscape check failed due to below error. Please take necessary action.<br></p>
                <p>ERROR: """ + error + """</p>
                """+ narrato_team_sign_off(False) +"""
            </div>
            </body></html>"""
    html_content = body
    msg = EmailMessage(subject, html_content, from_email, to_email)
    msg.content_subtype = "html"
    msg.send()


# send copyscape credits running out email to internal team
def send_copyscape_credits_running_out_email(message):
    to_email = ['sophias@godotmedia.com', 'raghav@narrato.io', 'work@narrato.io']
    subject = 'Copyscape credits are running low'
    from_email = get_from_support_email()
    body = """<html><body>
            <div>
                <p>Hi there!</p>
                <p>""" + message + """</p>
                """+ narrato_team_sign_off(False) +"""
            </div>
            </body></html>"""
    html_content = body
    msg = EmailMessage(subject, html_content, from_email, to_email)
    msg.content_subtype = "html"
    msg.send()


def mixed_writer_payments_error_notification(message):
    to_email = ['sophia@narrato.io', 'raghav@narrato.io', 'work@narrato.io']
    subject = 'Writer invoice not generated!'
    from_email = get_from_support_email()
    body = """<html><body>
            <div>
                <p>Hi there!</p>
                <p>""" + message + """</p>
                """+ narrato_team_sign_off(False) +"""
            </div>
            </body></html>"""
    html_content = body
    msg = EmailMessage(subject, html_content, from_email, to_email)
    msg.content_subtype = "html"
    msg.send()


# Project cancel or Task cancel and refund emails for client

# project canceled and refund email
def send_delete_project_email_to_freelance_client(guser, project_fee, project_code):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = 'Your project '+project_code+' has been cancelled'
    from_email = get_from_support_email()
    project = Project.objects.get(project_code=project_code)
    project_fee_with_currency = get_project_refund_currency_icon(project) + str(project_fee)
    body = """<p """+EMAIL_P_STYLE+""">This is to confirm that the project """+project_code+""" has been cancelled and your credit of """+str(project_fee_with_currency)+""" has been credited to your Narrato credit account. The credit on Narrato account is available for <a """+EMAIL_A_STYLE+""" href=\""""+R_SITE_URL+"""client/place-order\">placing new orders</a> anytime.</p>
                """+narrato_team_sign_off(guser, 1)+""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


# task canceled and refund email
def send_delete_task_email_to_freelance_client(guser, task_fee, task_code):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = 'Your job '+task_code+' has been cancelled'
    from_email = get_from_support_email()
    task = Task.objects.get(task_code=task_code)
    task_fee_with_currency = get_project_refund_currency_icon(task.project) + str(task_fee)
    body = """<p """+EMAIL_P_STYLE+""">This is to confirm that the job """+task_code+""" has been cancelled and your credit of """+str(task_fee_with_currency)+""" has been credited to your Narrato credit account. The credit on Narrato account is available for <a """+EMAIL_A_STYLE+""" href=\""""+R_SITE_URL+"""client/place-order\">placing new orders</a> anytime.</p>
                """+narrato_team_sign_off(guser, 1)+""""""
    
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    record_web_notification(guser, subject, html_content)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


def list_of_writer_jobs_to_be_auto_accepted_in_24_hrs(guser):
    return_list = []
    start_time = datetime(now().year, now().month, now().day, 0, 0, 0, tzinfo=pytz.utc)
    required_time = start_time - timedelta(days=JOB_AUTO_ACCEPT_DAYS-1)
    writer_jobs = WriterJobs.objects.filter(job__project__user=guser, status='delivered', date_completed__lte=required_time).order_by('id')
    for writer_job in writer_jobs:
        task = writer_job.job
        if task:
            return_list.append(task)
    return return_list


def send_jobs_will_be_auto_accepted_email_to_freelance_client(guser_id):
    guser = GUser.objects.get(id=guser_id)
    # content builder block open
    task_list = list_of_writer_jobs_to_be_auto_accepted_in_24_hrs(guser)
    if len(task_list) == 0:
        return
    list_generator = ""
    for task in task_list:
        task_details = get_task_code_description_writer_name_for_task(task)
        if task_details:
            project_code, project_details_link, project_link, project_description = get_project_code_project_link(task.project, freelance=True)
            task_link_text = '<a '+EMAIL_A_STYLE+' href="'+project_link+'">'+task_details+'</a>'
            list_generator += '<li '+EMAIL_LI_STYLE+'>' + task_link_text + '</li>'
    if not list_generator:
        return
    list_generator = '<ul>'+ list_generator +'</ul>'
    # content builder block close

    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = "These jobs will get auto-accepted tomorrow - please review"
    from_email = get_from_support_email()
    body = """<p """+EMAIL_P_STYLE+""">This is a gentle reminder that your """+str(JOB_AUTO_ACCEPT_DAYS)+"""-day review period for the below jobs end tomorrow. Please review and update status, or these will get auto-accepted by tomorrow.</p>
                <p """+EMAIL_P_STYLE+""">
                    """+ list_generator + """
                </p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})    
    record_web_notification(guser, subject, html_content)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)


def send_first_email_for_monthly_deal(guser, month_coupon_code):
    if guser:
        first_name, to_email = get_first_name_and_to_email(guser)
    else:
        to_email = ['jhadiksha13@gmail.com', 'raghav@narrato.io', 'santosh.bagalkot@godotmedia.com', 'sophia@narrato.io']
        first_name = "there"

    bcc_email = get_bcc_email()
    subject = 'Take 20% Off on Your Next Content Order on Narrato'
    from_email = get_from_support_email()
    
    body = """<p """+EMAIL_P_STYLE+""">We have missed you on Narrato, and wanted to give you one more reason to order content with us again soon.</p>
                <p """+EMAIL_P_STYLE+""">We’d like to offer you an exclusive 20% off on your next order (valid till 15th of this month).
                Simply use the code <strong>"""+month_coupon_code+"""</strong> while placing order on Narrato and get the awesome discount on any order size.</p>
                """+get_btn_for_email('Place Order Now', R_SITE_URL + 'client/place-order')+"""
                <p """+EMAIL_P_STYLE+""">See you back soon on Narrato!</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    if guser:
        record_web_notification(guser, subject, html_content)
        if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PRODUCT_RELATED.value):
            return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.6)


def send_reminder_email_for_monthly_deal(guser, month_coupon_code):
    if guser:
        first_name, to_email = get_first_name_and_to_email(guser)
    else:
        to_email = ['jhadiksha13@gmail.com', 'raghav@narrato.io', 'santosh.bagalkot@godotmedia.com', 'sophia@narrato.io']
        first_name = "there"

    bcc_email = get_bcc_email()
    subject = 'Last 5 Days to Get Your 20% Off on Next Content Order'
    from_email = get_from_support_email()

    body = """<p """+EMAIL_P_STYLE+""">Just a gentle reminder that your exclusive next order discount of 20% will expire in 5 days on the 15th of the month.
                Don’t miss this great opportunity to save on your content order.</p>
                <p """+EMAIL_P_STYLE+""">Simply use the code <strong>"""+month_coupon_code+"""</strong> while placing order on Narrato and get the awesome deal on any order size.</p>
                """+get_btn_for_email('Place Order Now', R_SITE_URL + 'client/place-order')+"""
                <p """+EMAIL_P_STYLE+""">See you back soon on Narrato!</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    if guser:
        record_web_notification(guser, subject, html_content)
        if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PRODUCT_RELATED.value):
            return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    update_Client2MRetentionCouponTracker(guser)
    time.sleep(0.6)


# update date_last_notification field in Client2MRetentionCouponTracker Table
def update_Client2MRetentionCouponTracker(user):
    if not user:
        return
    row_to_be_updated = Client2MRetentionCouponTracker.objects.filter(client=user).first()
    if not row_to_be_updated:
        row_to_be_updated = Client2MRetentionCouponTracker()
        row_to_be_updated.client = user
    row_to_be_updated.date_last_notification_sent = now()
    row_to_be_updated.save()

# send email to writers who have been autoselected based on client's preference/higher rating/highly rated by clients
def send_writer_autoselected_for_client_project_email(writer, project):
    project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    # to test
    # to_email = ['diksha.jha@godotmedia.com','santosh.bagalkot@godotmedia.com','raghav@narrato.io']
    bcc_email = get_bcc_email()
    # date = project.autofloat_hours.strftime("%d-%m-%Y %H:%M:%S")
    date = get_local_time(project.autofloat_hours)
    subject = project_code + ' exclusively available to you for the next 8 hours - pick jobs quickly.'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+"""> """ + project_code + """ jobs are exclusively available to you as a preferred writer for the next 8 hours - pick jobs quickly before they get released to other writers.</p>
                <p """+EMAIL_P_STYLE+"""> The jobs are exclusively available to you till """+ str(date) + """</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    prepare_and_send_writer_selected_for_project_notification(guser, project_code, project_description)
    if(is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value)):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)


# send email to writers for getting  monthly milestone bonus 
def send_bonus_to_writer_email(writer, bonus):
    # project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    # to test
    # to_email = ['diksha.jha@godotmedia.com','santosh.bagalkot@godotmedia.com','raghav@narrato.io']
    bcc_email = get_bcc_email()
    subject = 'Congratulations on completing '+ str(bonus['job_counter']) +' jobs - bonus awarded'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+"""> Congratulations on successfully completing """+str(bonus['job_counter'])+""" jobs! You are now eligible to receive """+ str(bonus['bonus_percentage'])+"""% bonus on your monthly earnings.</p>
                <p """+EMAIL_P_STYLE+""">Happy freelancing!</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})

    record_web_notification(guser, subject, html_content)
    # prepare_and_send_writer_selected_for_project_notification(guser, project_code, project_description)
    if(is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value)):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)


# send email to writers for getting mega monthly bonus 
def send_mega_monthly_bonus_to_writer_email(writer):
    # project_code, project_details_link, project_link, project_description = get_project_code_project_link(project, freelance=True)
    guser = writer.guser
    first_name, to_email = get_first_name_and_to_email(guser)
    # to test
    # to_email = ['diksha.jha@godotmedia.com','santosh.bagalkot@godotmedia.com','raghav@narrato.io']
    bcc_email = get_bcc_email()
    subject = 'Mega Monthly Quality Bonus Awarded'
    from_email = get_from_email()
    body = """<p """+EMAIL_P_STYLE+"""> Congratulations on doing great work on Narrato! The quality of your work this month has been top-notch and you’re awarded the mega monthly quality bonus of INR 1200 for maintaining a 4+ average rating with no job rejections.</p>
                <p """+EMAIL_P_STYLE+""">To sum it up, we have been awesome this month! :)</p>
                <p """+EMAIL_P_STYLE+""">Keep it up!</p>
                <p """+EMAIL_P_STYLE+""">""" + get_writer_login_link() + """</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/writer_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})
    
    record_web_notification(guser, subject, html_content)
    # prepare_and_send_writer_selected_for_project_notification(guser, project_code, project_description)
    if(is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.PROJECT_RELATED.value)):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()    
    time.sleep(0.5)

# email sent when credit added after new user uses client's referral coupon to place order
def send_bonus_credit_added_to_coupon_referrer_email(guser, bonus_with_currency):
    first_name, to_email = get_first_name_and_to_email(guser)
    bcc_email = get_bcc_email()
    subject = 'You just earned Narrato credit for a successful referral'
    from_email = get_from_support_email()
    body = """<p """+EMAIL_P_STYLE+""">Congratulations! You have earned """+ bonus_with_currency + """ Narrato credit for a successful referral.</p>
                <p """+EMAIL_P_STYLE+""">You can use it to <a """+EMAIL_A_STYLE+""" href='""" + R_SITE_URL + """client/place-order'>place content orders</a> 
                on Narrato anytime.</p>
                """+ narrato_team_sign_off(guser) +""""""
    unsubscribe_link = get_unsubscribe_link(guser)
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': unsubscribe_link})    
    record_web_notification(guser, subject, html_content)
    if is_this_email_unsubscribed(guser, MarketplaceEmailUnsubscribeTypes.ACCOUNT_RELATED.value):
        return
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()


# share referral coupon/link via email to friends/followers
def share_referral_coupon_link_email(name, guser, email, referral_coupon, referral_link):
    bcc_email = get_bcc_email()
    to_email = [email]
    subject = 'Your friend '+name+' is recommending Narrato to you'
    from_email = get_from_support_email()
    first_name = 'there!'
    body = """<p """+EMAIL_P_STYLE+""">Your friend, """+name+""", is recommending the content writing services of Narrato.io and gifting you a 22%
                discount coupon - <strong>"""+referral_coupon+"""</strong> to redeem on your first order on <a """+EMAIL_A_STYLE+""" href='""" + referral_link + """'> Narrato</a>.</p>
                """+get_btn_for_email('Try Narrato Now', referral_link)+"""
                <p """+EMAIL_P_STYLE+""">Narrato is a leading platform to order quality content, fast - from thousands of quality-vetted writers
                intelligently matched using smart algorithms. The platform supports content orders for blog posts,
                articles, website copy, product descriptions and more. Free plagiarism checks and free images are some other 
                cool features of Narrato.</p>
                <p """+EMAIL_P_STYLE+""">Best regards,<br>
                Narrato Team
                </p>"""
    html_content = render_to_string('email_templates/client_email_template.html', {'first_name': first_name, 'email_content':body, 'unsubscribe_link': ''})
    # record_web_notification(guser, subject, body)
    msg = EmailMessage(subject, html_content, from_email, to_email, bcc=bcc_email)
    msg.content_subtype = "html"
    msg.send()
    time.sleep(0.5)
