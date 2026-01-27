from django.shortcuts import render, redirect, get_object_or_404
from .models import Student
from .forms import StudentForm


# This view handles both LISTING all contacts and SAVING (Add/Edit)
def student_view(request):
    if request.method == 'POST':
        sid = request.POST.get('student_id')

        # If student_id exists, we are UPDATING an existing record
        if sid:
            student_instance = get_object_or_404(Student, pk=sid)
            form = StudentForm(request.POST, instance=student_instance)
        else:
            # If no ID, we are ADDING a new record
            form = StudentForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('/std/')  # This refreshes the frontend list

    # Fetch all data from MySQL to display on the page
    students = Student.objects.all()
    form = StudentForm()
    return render(request, 'testapp/std.html', {'form': form, 'students': students})


# THIS WAS MISSING: The Delete function
def delete_student(request, pk):
    student = get_object_or_404(Student, pk=pk)
    student.delete()
    return redirect('/std/')