from django.shortcuts import redirect,render
from .models import Author
from django.views.decorators.csrf import csrf_exempt


# Using csrf_exempt instead of csrf token
@csrf_exempt
def welcome(request):    # The signup page to register new user.
    return render(request,'signup.html')


@csrf_exempt
def existing(request):      #The signin page for existing users.
    return render(request, 'signin.html')

@csrf_exempt
def homepage(request):
    # Redirection based on response by the user.
    if request.method == "POST":
       passwor = request.POST.get("passw")
       userid = request.POST.get("user_id")
       errors = {'error':''}
       #Exception Handling done.
       #If a user enters a username already taken :
       if Author.objects.filter(user_name=userid).exists():
            #print("This user_id is taken. Enter another user_id.")
            errors['error']="This User id is taken. Enter another User id."
            #print(error)
            return render(request, 'signup.html', errors) # Redirects to the signup page.
       else:
           # For new users, the credentials are stored in the model.
            user = Author(user_name=userid, password=passwor)
            user.save()
            # print("New User")
            # After registration, the user is redirected to login page to login.
            response = redirect('/signin')
       return response
 
    else:
        return render(request, 'signin.html')
        

@csrf_exempt
def dashboard(request):
    if request.method == 'POST':
        password = request.POST["passw"]
        userid = request.POST["user_id"]
        #print(userid,password)
        errors = {}
        if Author.objects.filter(user_name=userid, password=password).exists():
            return render(request, 'index.html')  # TODO: Personalized Dashboard
        else:
            errors['error']="Invalid Credentials Entered"
            # For new users, redirection to signup page in case ofs
            # invalid credentials entered
            return render(request, 'signin.html', errors)
    else:
        return redirect('/signin') 
  
