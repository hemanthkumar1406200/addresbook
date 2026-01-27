# Create your views here.
from django.shortcuts import render
from testapp.forms import StudentForm
def student_view(request):
    form = StudentForm()
    return render(request,'testapp/std.html',{'form':form})
def student_view(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save(commit=True)
            print('Record inserted into DB successfully.....')
    form = StudentForm()
    return render(request,'testapp/std.html',{'form':form})