import "./style.less";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, List, Pagination, Tag, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useUpdateCategory } from "./useUpdate";
import { debounce } from "lodash";
import { DeletePost, useGetPosts } from "../../api/post";
import useComputeHeight from "../../hooks/useHeight";
import { toLocalDate } from "../../utils/dateTime";

export const Post = () => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);
  const [posts, setPosts] = useState<IPagination<IPost[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateCategoryModal, showModalUpdateCategory] = useUpdateCategory();
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
  }, [query]);

  const onRefetch = () => {
    setLoading(true);
    refetch();
    setLoading(false);
    setValue("");
  };

  const debouncedSearch = debounce((value) => {
    useGetPosts({ ...query, q: value })
      .then((res) => setPosts(res))
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

  return (
    <div className="post">
      <div className="post-header">
        <div className="flex-center">
          <div style={{ marginRight: 12, fontWeight: 600 }}>
            Total: {posts?.total}
          </div>
          <Button
            style={{ marginRight: 12 }}
            icon={<i className="fa-solid fa-rotate"></i>}
            onClick={onRefetch}
          >
            Refetch
          </Button>
          <Input
            value={value}
            onChange={onSearchPost}
            style={{ width: 250, marginRight: 12 }}
            placeholder="Search to post..."
            suffix={
              loading ? (
                <LoadingOutlined spin />
              ) : (
                <i className="fa fa-search"></i>
              )
            }
          />
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
          dataSource={posts?.data}
          renderItem={(item, index) => (
            <List.Item>
              <div className="flex w-full">
                <div
                  className="image-topic"
                  style={{
                    width: 80,
                    height: 80,
                    backgroundImage: `url(${item.imageTopic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 5,
                    marginRight: 12,
                  }}
                ></div>
                <div
                  className="content w-full"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h3 className="w-full">{item?.title}</h3>
                  <span className="w-full">{item?.description}</span>
                  <div className="post-info flex" style={{ marginTop: 10 }}>
                    <div className="flex" style={{ marginRight: 12 }}>
                      {item.createdBy ? (
                        <Tag color="var(--theme-primary)">{item.createdBy}</Tag>
                      ) : (
                        ""
                      )}
                      <span style={{ color: "var(--theme-primary)" }}>
                        {toLocalDate(item.createdAt)}
                      </span>
                    </div>
                    <div className="flex" style={{ marginRight: 12 }}>
                      {item.updatedBy ? (
                        <Tag color="#008000">{item.updatedBy}</Tag>
                      ) : (
                        ""
                      )}
                      <span style={{ color: "#008000" }}>
                        {toLocalDate(item.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      {posts?.data && posts.data.length > 19 ? (
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
            total={posts?.total}
            pageSize={20}
            showSizeChanger={true}
            pageSizeOptions={["20", "50", "100"]}
          />
        </div>
      ) : (
        ""
      )}
      {updateCategoryModal}
    </div>
  );
};
