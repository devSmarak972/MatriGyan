import requests
username = "matrigyan972"
api_token = "30f01358e293e864d50ee5d3222c77d78aa06567"
domain_name = "matrigyan972.pythonanywhere.com"
def reload():
    response = requests.post(
        'https://www.pythonanywhere.com/api/v0/user/{username}/webapps/{domain_name}/reload/'.format(
            username=username, domain_name=domain_name
        ),
        headers={'Authorization': 'Token {token}'.format(token=api_token)}
    )
    if response.status_code == 200:
        print('reloaded OK')
    else:
        print('Got unexpected status code {}: {!r}'.format(response.status_code, response.content))
        
        