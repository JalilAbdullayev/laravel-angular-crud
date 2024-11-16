<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;

class EmployeeController extends Controller {
    public function index() {
        return Employee::all();
    }

    public function store(EmployeeRequest $request) {
        return Employee::create($request->validated());
    }

    public function show(Employee $employee): Employee {
        return $employee;
    }

    public function update(EmployeeRequest $request, Employee $employee): Employee {
        $employee->update($request->validated());
        return $employee;
    }

    public function destroy(Employee $employee): JsonResponse {
        $employee->delete();
        return response()->json();
    }
}
