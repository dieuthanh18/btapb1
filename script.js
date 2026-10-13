"use strict";


// Dữ liệu khởi tạo. Được phép chỉnh sửa hoặc thêm thuộc tính nếu cần.
const items = [
    {
        "id": 1,
        "title": "Viết báo cáo HTML",
        "dueDate": "2026-10-20",
        "priority": "Cao",
        "status": "pending"
    },
    {
        "id": 2,
        "title": "Ôn Flexbox",
        "dueDate": "2026-10-23",
        "priority": "Trung bình",
        "status": "pending"
    },
    {
        "id": 3,
        "title": "Làm bài DOM",
        "dueDate": "2026-10-19",
        "priority": "Cao",
        "status": "done"
    },
    {
        "id": 4,
        "title": "Đọc tài liệu CSS",
        "dueDate": "2026-10-25",
        "priority": "Thấp",
        "status": "pending"
    },
    {
        "id": 5,
        "title": "Thiết kế trang cá nhân",
        "dueDate": "2026-10-21",
        "priority": "Trung bình",
        "status": "done"
    }
];


const taskList = document.querySelector('#taskList');
const taskForm = document.querySelector('#taskForm');
const searchInput = document.querySelector('#searchInput');
const statusFilter = document.querySelector('#statusFilter');
const errorMsg = document.querySelector('#errorMsg');


// C1: Viết hàm hiển thị dữ liệu từ mảng lên DOM.
function renderTasks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const filterValue = statusFilter.value;
   
    taskList.innerHTML = '';
   
    const filteredItems = items.filter(item => {
        const matchSearch = item.title.toLowerCase().includes(searchText);
        const matchFilter = filterValue === 'Tất cả' || item.status === filterValue;
        return matchSearch && matchFilter;
    });


    filteredItems.forEach(item => {
        const li = document.createElement('li');
        li.className = `task-item status-${item.status}`;
        li.innerHTML = `
            <div class="task-info">
                <div class="task-title">${item.title}</div>
                <div class="task-meta">
                    Hạn: ${item.dueDate || 'Không có'} | Ưu tiên: ${item.priority}
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-toggle" onclick="toggleStatus(${item.id})">
                    ${item.status === 'pending' ? 'Hoàn thành' : 'Hoàn tác'}
                </button>
                <button class="btn-delete" onclick="deleteTask(${item.id})">Xóa</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}


// C2: Viết hàm đọc form, kiểm tra dữ liệu và thêm bản ghi.
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
   
    const title = document.querySelector('#taskTitle').value.trim();
    const dueDate = document.querySelector('#taskDueDate').value;
    const priority = document.querySelector('#taskPriority').value;


    if (!title) {
        errorMsg.style.display = 'block';
        return;
    }
    errorMsg.style.display = 'none';


    const newTask = {
        id: Date.now(),
        title: title,
        dueDate: dueDate,
        priority: priority,
        status: "pending"
    };
   
    items.push(newTask);
    taskForm.reset();
    renderTasks();
});


// C3: Viết chức năng tìm kiếm và lọc trạng thái.
searchInput.addEventListener('input', renderTasks);
statusFilter.addEventListener('change', renderTasks);


// C4: Viết chức năng cập nhật trạng thái và xóa theo ID.
window.toggleStatus = function(id) {
    const item = items.find(i => i.id === id);
    if (item) {
        item.status = item.status === 'pending' ? 'done' : 'pending';
        renderTasks();
    }
};


window.deleteTask = function(id) {
    if (confirm('Bạn có chắc muốn xóa công việc này?')) {
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            renderTasks();
        }
    }
};


// Gợi ý: addEventListener, querySelector, createElement, textContent, filter.
// KHÔNG có lời giải mẫu trong file này.
renderTasks();

