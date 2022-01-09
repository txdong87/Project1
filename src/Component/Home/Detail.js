import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Avatar from '../../Assets/image/Avatar.jpeg';

export default function HomeDetail(props) {
    return (
        <div className="row" style={{ paddingLeft: '20px', paddingRight: '10px', boxSizing: 'border-box', marginLeft: 0, marginRight: 0, marginBottom: '200px' }}>
            <div className="col-sm-0 col-md-2"></div>
            <div className="col-sm-12 col-md-6">
                <Tabs>
                    <TabList>
                        <Tab>ABOUT PROJECT</Tab>
                        <Tab>ABOUT AUTHOR</Tab>
                        <Tab>ABOUT MARVEL</Tab>
                    </TabList>

                    <TabPanel>
                        <div>
                            <h2 style={{ marginTop: '50px', marginBottom: '20px' }}>VỀ MARVEL COMIC LIST</h2>
                            <p>
                                Marvel Comic List là một dự án cá nhân cho môn học Project 1 với đề tài tìm hiểu về ASP.NET MVC và API để xây dựng Web App sử dụng các public API. Marvel Comic List là một trang thông tin tìm kiếm thông tin các nhân vật, bộ truyện tranh từ cơ sở dữ liệu của Marvel Comic. Phục vụ người đọc có thể tra cứu dễ dàng các đầu truyện có nhân vật yêu thích xuất hiện, hay tổng hợp những nhân vật có xuất hiện trong các đầu truyện.
                            </p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="row" style={{ marginTop: '50px', marginBottom: '20px' }}>
                            <div className="col-sm-12 col-md-4">
                                <img src={Avatar} style={{ width: '100%' }} />
                            </div>
                            <div className="col-sm-12 col-md-8" style={{ marginTop: '20px' }}>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>Họ và tên:</b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>MSSV: </b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>Lớp:</b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>Trường:</b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>Email:</b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>Github:</b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <div style={{ width: '30%' }}><b>Facebook:</b> </div>
                                    <div style={{ width: '40%' }}>XXXXXXX</div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div>
                            <h2 style={{ marginTop: '50px', marginBottom: '20px' }}>ABOUT MARVEL</h2>
                            <p>
                                Marvel Publishing, Inc, thường được gọi là Marvel Comics hay đơn giản là Marvel, là một công ty Mỹ chuyên xuất bản truyện tranh và các phương tiện thông tin liên quan. Marvel Entertainment, Inc, một công ty con của Công ty Walt Disney, sở hữu nhà xuất bản Marvel.
                                Các truyện tranh của công ty bắt đầu xuất bản vào năm 1939 như các ấn phẩm, và trong thập niên 1950 đã trở thành ấn bản thường được gọi là Atlas Comics. Đổi tên thành Marvel từ năm 1961, với sự ra đời của Fantastic Four và các siêu anh hùng khác được tạo ra bởi Stan Lee, Jack Kirby, Steve Ditko, và những người khác. Marvel trở thành một trong những nhà xuất bản truyện tranh lớn nhất thế giới. Cùng với đối thủ cạnh tranh là DC Comics, hai công ty này chiếm tới 80% thị trường truyện tranh tại Mỹ
                            </p>
                        </div>
                        <hr />
                        <div>
                            <h2 style={{ marginTop: '50px', marginBottom: '20px' }}>ABOUT MARVEL COMICS API</h2>
                            <p>
                                Marvel Publishing, Inc, thường được gọi là Marvel Comics hay đơn giản là Marvel, là một công ty Mỹ chuyên xuất bản truyện tranh và các phương tiện thông tin liên quan. Marvel Entertainment, Inc, một công ty con của Công ty Walt Disney, sở hữu nhà xuất bản Marvel.
                                Các truyện tranh của công ty bắt đầu xuất bản vào năm 1939 như các ấn phẩm, và trong thập niên 1950 đã trở thành ấn bản thường được gọi là Atlas Comics. Đổi tên thành Marvel từ năm 1961, với sự ra đời của Fantastic Four và các siêu anh hùng khác được tạo ra bởi Stan Lee, Jack Kirby, Steve Ditko, và những người khác. Marvel trở thành một trong những nhà xuất bản truyện tranh lớn nhất thế giới. Cùng với đối thủ cạnh tranh là DC Comics, hai công ty này chiếm tới 80% thị trường truyện tranh tại Mỹ
                            </p>
                        </div>
                        <div className="row" style={{ marginTop: '30px' }}>
                            <div className="col-5">
                                <b>Characters</b>
                            </div>
                            <div className="col-7">
                                <p>Toàn bộ các nhân vật, sinh vật được xuất hiện trong vũ trụ Marvel, cũng như những vũ trụ, dòng thời gian song song khác.</p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '5px' }}>
                            <div className="col-5">
                                <b>Comics</b>
                            </div>
                            <div className="col-7">
                                <p>Những ấn bản, tập truyện được phát hành bản giấy hay sách điện tử.</p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '5px' }}>
                            <div className="col-5">
                                <b>Comic stories</b>
                            </div>
                            <div className="col-7">
                                <p>Những câu chuyện bao gồm một hay nhiều tập truyện, được sử dụng lại từ những bộ truyện khác nhau để kể một câu chuyện liền mạch về nội dụng.</p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '5px' }}>
                            <div className="col-5">
                                <b>Comic events and crossovers</b>
                            </div>
                            <div className="col-7">
                                <p>Những câu chuyện rất lớn, liên kết nhiều bộ truyện lại với nhau.</p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '5px' }}>
                            <div className="col-5">
                                <b>Creators</b>
                            </div>
                            <div className="col-7">
                                <p>Tất cả những tác giả, thành viên tham gia trong quá trình sản xuất nội dung, ấn bản của tập truyện hay bộ truyện.</p>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>

            <div className="col-sm-12 col-md-4">
                <div style={{ paddingLeft: '5px', boxSizing: 'border-box' }}>
                    <h2>FEATURES</h2>
                    <ul className="list-group">
                        <li href="/character" className="list-group-item" style={{ cursor: 'pointer' }}>
                            Character
                            <span style={{ float: 'right' }} class="badge badge-danger">New</span>
                        </li>
                        <li href="/series" className="list-group-item" style={{ cursor: 'pointer' }}>
                            Series
                            <span style={{float: 'right'}} class="badge badge-danger">New</span>
                        </li>

                        <li href="/series" className="list-group-item" style={{ cursor: 'pointer' }}>
                            New function(Common Soon)
                            <span style={{float: 'right'}} class="badge badge-warning">New</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="col-sm-0 col-md-2"></div>
        </div>
    )
}
