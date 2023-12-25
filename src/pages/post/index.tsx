import "./style.less";
import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  List,
  Menu,
  Pagination,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useUpdateCategory } from "./useUpdate";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import { DeletePost, useGetPosts } from "../../api/post";
import useComputeHeight from "../../hooks/useHeight";

export const Post = () => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateCategoryModal, showModalUpdateCategory] = useUpdateCategory();
  const [options, setOptions] = useState<IPost[]>([]);
  const [value, setValue] = useState<string>("");
  const [query, setQuery] = useState<QueryDto>({
    offset: 0,
    pageSize: 20,
    orderBy: "",
    q: "",
  });

  const refetch = () => {
    useGetPosts({ ...query })
      .then((res) => setPosts(res))
      .catch((err) => message.error(err?.message));
  };

  useEffect(() => {
    refetch();
  }, []);

  const onRefetch = () => {
    setLoading(true);
    refetch();
    setLoading(false);
    setValue("");
  };

  const debouncedSearch = debounce((value) => {
    useGetPosts({ ...query, q: value })
      .then((res) => setOptions(res))
      .catch((err) => message.error(err?.message));
  }, 500);

  const onSearchPost = (e: any) => {
    setValue(e.target.value);
    if (e.target.value) {
      setLoading(true);
      debouncedSearch(e.target.value);
    } else {
      setLoading(false);
      refetch();
    }
  };

  const onDeletePost = async (id: string) => {
    await DeletePost(id);
    onRefetch();
  };

  const onSelectSearch = (post: IPost) => {
    setPosts([{ ...post }]);
    setLoading(false);
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  return (
    <div className="post">
      <div className="post-header">
        <div className="flex-center">
          <Button
            icon={<i className="fa-solid fa-rotate"></i>}
            onClick={onRefetch}
          >
            Refetch
          </Button>
          <Dropdown
            open={loading}
            overlay={
              <Menu>
                {options.map((option) => (
                  <Menu.Item
                    onClick={() => onSelectSearch(option)}
                    key={option.id}
                  >
                    {option.title?.slice(0, 100)}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Input
              value={value}
              onChange={onSearchPost}
              style={{ width: 250, marginLeft: 12 }}
              placeholder="Search to post..."
              suffix={
                loading ? (
                  <LoadingOutlined spin />
                ) : (
                  <i className="fa fa-search"></i>
                )
              }
            />
          </Dropdown>
        </div>
        <Button
          type="primary"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => showModalUpdateCategory(undefined, refetch)}
        >
          Add
        </Button>
      </div>
      <div ref={refHeight} style={{ overflow: "auto", height: height - 70 }}>
        <List
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          marginTop: 10,
        }}
      >
        <Pagination
          showQuickJumper
          total={200}
          pageSize={20}
          showSizeChanger={true}
          pageSizeOptions={["20", "50", "100"]}
        />
      </div>
      {updateCategoryModal}
    </div>
  );
};
