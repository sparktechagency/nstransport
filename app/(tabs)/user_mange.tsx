import {
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserListQuery,
} from "@/redux/apiSlices/authApiSlices";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

interface User {
  id: number;
  name: string;
  role: string;
  passcode: string;
  created_at: string;
  updated_at: string;
}

const UserManage = () => {
  const { data: userList, refetch } = useUserListQuery({});
  const [addNewUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [newUserName, setNewUserName] = useState("");
  const [newUserPasscode, setNewUserPasscode] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editUserPasscode, setEditUserPasscode] = useState("");

  const handleAddUser = async () => {
    if (!newUserName || !newUserPasscode) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (newUserPasscode.length !== 6 || !/^\d+$/.test(newUserPasscode)) {
      Alert.alert("Error", "Passcode must be 6 digits");
      return;
    }

    try {
      await addNewUser({
        name: newUserName,
        passcode: newUserPasscode,
      }).unwrap();
      refetch();
      setNewUserName("");
      setNewUserPasscode("");
      setAddModalVisible(false);
      Alert.alert("Success", "User added successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add user");
    }
  };

  const handleEditUser = async () => {
    if (!currentUser || !editUserName || !editUserPasscode) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (editUserPasscode.length !== 6 || !/^\d+$/.test(editUserPasscode)) {
      Alert.alert("Error", "Passcode must be 6 digits");
      return;
    }

    try {
      await updateUser({
        id: currentUser.id,
        data: {
          name: editUserName,
          passcode: editUserPasscode,
          _method: "PUT",
        },
      }).unwrap();
      refetch();
      setEditModalVisible(false);
      setCurrentUser(null);
      Alert.alert("Success", "User updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update user");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteUser(userId).unwrap();
              refetch();
              Alert.alert("Success", "User deleted successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to delete user");
            }
          },
        },
      ]
    );
  };

  const openEditModal = (user: User) => {
    setCurrentUser(user);
    setEditUserName(user.name);
    setEditUserPasscode(user.passcode);
    setEditModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-xl text-gray-800 font-bold`}>User Management</Text>
        <TouchableOpacity
          style={tw`bg-primary px-4 py-2 rounded-lg shadow-sm`}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={tw`text-white`}>Add User</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {userList?.data?.data?.map((user: User) => (
          <View
            key={user.id}
            style={tw`bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-sm`}
          >
            <View style={tw`flex-row justify-between items-start`}>
              <View>
                <Text style={tw`text-gray-800 text-lg font-bold`}>
                  {user.name}
                </Text>
                <Text style={tw`text-gray-600`}>Role: {user.role}</Text>
                <Text style={tw`text-gray-600`}>Passcode: {user.passcode}</Text>
                <Text style={tw`text-gray-500 text-sm mt-2`}>
                  Created: {formatDate(user.created_at)}
                </Text>
                {user.updated_at !== user.created_at && (
                  <Text style={tw`text-gray-500 text-sm`}>
                    Updated: {formatDate(user.updated_at)}
                  </Text>
                )}
              </View>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`mr-4`}
                  onPress={() => openEditModal(user)}
                >
                  <MaterialIcons name="edit" size={24} color={PrimaryColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteUser(user.id)}>
                  <MaterialIcons name="delete" size={24} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add User Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-30`}
        >
          <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
            <Text style={tw`text-gray-800 text-xl font-bold mb-4`}>
              Add New User
            </Text>

            <TextInput
              style={tw`bg-gray-100 text-gray-800 rounded-lg p-3 mb-4 border border-gray-300`}
              placeholder="Name"
              placeholderTextColor="#6B7280"
              value={newUserName}
              onChangeText={setNewUserName}
            />

            <TextInput
              style={tw`bg-gray-100 text-gray-800 rounded-lg p-3 mb-6 border border-gray-300`}
              placeholder="6-digit Passcode"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              maxLength={6}
              value={newUserPasscode}
              onChangeText={setNewUserPasscode}
            />

            <View style={tw`flex-row justify-end`}>
              <Pressable
                style={tw`px-4 py-2 rounded-lg mr-2`}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={tw`text-gray-600`}>Cancel</Text>
              </Pressable>
              <Pressable
                style={tw`bg-primary px-4 py-2 rounded-lg shadow-sm`}
                onPress={handleAddUser}
              >
                <Text style={tw`text-white`}>Add User</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-30`}
        >
          <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
            <Text style={tw`text-gray-800 text-xl font-bold mb-4`}>
              Edit User
            </Text>

            <TextInput
              style={tw`bg-gray-100 text-gray-800 rounded-lg p-3 mb-4 border border-gray-300`}
              placeholder="Name"
              placeholderTextColor="#6B7280"
              value={editUserName}
              onChangeText={setEditUserName}
            />

            <TextInput
              style={tw`bg-gray-100 text-gray-800 rounded-lg p-3 mb-6 border border-gray-300`}
              placeholder="6-digit Passcode"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              maxLength={6}
              value={editUserPasscode}
              onChangeText={setEditUserPasscode}
            />

            <View style={tw`flex-row justify-end`}>
              <Pressable
                style={tw`px-4 py-2 rounded-lg mr-2`}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={tw`text-gray-600`}>Cancel</Text>
              </Pressable>
              <Pressable
                style={tw`bg-primary px-4 py-2 rounded-lg shadow-sm`}
                onPress={handleEditUser}
              >
                <Text style={tw`text-white`}>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserManage;
