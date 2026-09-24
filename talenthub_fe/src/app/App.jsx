import { RouterProvider } from "react-router"
import { routes } from "./router/routes.js"

function App() {
  // Logic

  // UI
  return <RouterProvider router={routes}/>

    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/admin" element={<AdminLayout />}>
    //         <Route path="test1" element={<CareerSiteJobList/>}/>
    //         <Route index element={<AdminDashdoard />}/>
    //         <Route path="jobs" element={<ApplicantList />}/>
    //         <Route path="candidates" element={<ApplicantList title="Quản lý ứng viên" description="Theo dõi, sàng lọc và quản lý toàn bộ ứng viên trong một quy trình thống nhất." />}/>
    //         <Route path="interviews" element={<AdminFeaturePage title="Lịch phỏng vấn" description="Quản lý lịch phỏng vấn và phối hợp cùng đội ngũ tuyển dụng." />}/>
    //         <Route path="talent-pool" element={<AdminFeaturePage title="Kho hồ sơ" description="Lưu trữ và tìm kiếm nguồn ứng viên tiềm năng cho các vị trí tương lai." />}/>
    //         <Route path="messages" element={<AdminFeaturePage title="Tin nhắn" description="Trao đổi nhanh với ứng viên và các thành viên trong đội ngũ tuyển dụng." />}/>
    //         <Route path="notifications" element={<AdminFeaturePage title="Thông báo" description="Cập nhật những hoạt động mới nhất trong quy trình tuyển dụng." />}/>
    //         <Route path="analytics" element={<AdminFeaturePage title="Phân tích tuyển dụng" description="Đánh giá hiệu quả tuyển dụng bằng các báo cáo trực quan và dễ theo dõi." />}/>
    //         <Route path="company" element={<AdminFeaturePage title="Hồ sơ công ty" description="Cập nhật thương hiệu tuyển dụng và thông tin hiển thị với ứng viên." />}/>
    //         <Route path="settings" element={<AdminFeaturePage title="Cài đặt" description="Tùy chỉnh workspace, thông báo và quyền truy cập của đội ngũ." />}/>
    //       </Route>
    //       <Route path="/" element={<PublicLayout />}>
    //         <Route index element={<>Search Job</>} />

    //       </Route>
    //     </Routes>
    //     <Routes>

    //     </Routes>
    //   </BrowserRouter>

    // </>
}
export default App;
