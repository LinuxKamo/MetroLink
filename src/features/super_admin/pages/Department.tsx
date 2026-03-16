import { useState } from "react";
import ActionButton from "../../shared/components/ui/ActionButton";
import { Plus } from "lucide-react";
import SearchBar from "../../mananger/components/ui/SearchBar";
import Popup from "../../shared/components/Popup";
import InputField from "../../shared/components/ui/InputField";
import DepartmentRow from "../components/ui/DepartmentRow";

function Department() {
  const [departments, setDepartments] = useState<
    { _id: string; name: string }[]
  >([
    { _id: "1", name: "Finance" },
    { _id: "2", name: "HR" },
  ]);

  const emptyDepartment = { _id: "", name: "" };

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(emptyDepartment);

  const handleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData(emptyDepartment);
    setShowModal(true);
  };

  const openEditModal = (department: { _id: string; name: string }) => {
    setIsEditing(true);
    setFormData(department);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d._id !== id));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    if (isEditing) {
      setDepartments((prev) =>
        prev.map((d) => (d._id === formData._id ? formData : d)),
      );
    } else {
      const newDepartment = {
        _id: Date.now().toString(),
        name: formData.name,
      };

      setDepartments((prev) => [...prev, newDepartment]);
    }

    setShowModal(false);
    setFormData(emptyDepartment);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold mt-5 text-[#1e293b]">Departments</h1>
          <span className="text-neutral-500/70 text-sm">
            Overview of All departments
          </span>
        </div>

        <ActionButton
          label="New Department"
          Icon={Plus}
          onClick={openCreateModal}
        />
      </div>

      <div className="mt-6">
        <SearchBar placeholder="Search Department" />
      </div>

      <div className="space-y-4 mt-8 flex flex-col">
        {departments.length > 0 ? (
          departments.map((department) => (
            <DepartmentRow 
              key={department._id} 
              department={department} 
              onEdit={openEditModal} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300">
            <span className="text-neutral-400 text-sm">
              No departments found
            </span>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <Popup isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-[#1e293b]">
              {isEditing ? "Edit Department" : "New Department"}
            </h1>

            <form
              className="flex flex-col space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <InputField
                label="Department Name"
                placeholder="e.g. Infrastructure"
                value={formData.name}
                onChange={handleChange}
              />

              <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  Cancel
                </button>

                <ActionButton label={isEditing ? "Update Department" : "Create Department"} />
              </div>
            </form>
          </div>
        </Popup>
      )}
    </>
  );
}

export default Department;
