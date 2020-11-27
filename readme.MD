crm.client project README

Sometimes a PUT or DELETE will not fire a request over http.  The problem is that calling http.put() or http.delete() doesn't issue the request until you subscribe to the observable.  From Angular docs "This observable is cold which means the request won't go out until something subscribes to the observable."  It is helpful in the WebAPI to return an object which can be the Observable.

For version mismatches see https://stackoverflow.com/questions/47115649/metadata-version-mismatch-with-angular-4

DJ - Instructions for building a pipeline in Azure DevOps:
https://medium.com/javascript-in-plain-english/how-to-create-a-build-pipeline-for-angular-in-azure-devops-a9255385275e