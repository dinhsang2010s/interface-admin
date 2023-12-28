import "./style.less";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Tag,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { DeletePost, useGetPosts } from "../../api/post";
import useComputeHeight from "../../hooks/useHeight";
import { toLocalDate } from "../../utils/dateTime";
import { FuncTable } from "../../components/FuncTable";
import UpdatePostModal from "./update";

export const Post = () => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);
  const [posts, setPosts] = useState<IPagination<IPost[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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
          //onClick={() => showModalUpdatePost(undefined, refetch)}
        >
          Add
        </Button>
      </div>
      <div ref={refHeight} style={{ overflow: "auto", height: height - 70 }}>
        <ul>
          {posts?.data?.map((post) => (
            <li className="post-item">
              <div style={{ display: "flex" }}>
                <div
                  className="image-topic"
                  style={{
                    flexShrink: 1,
                    width: 85,
                    minWidth: 85,
                    height: 70,
                    backgroundImage: `url(${post.imageTopic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 5,
                    marginRight: 12,
                  }}
                />
                <div
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Tag color="#db5cb5">{post.categoryName}</Tag>
                    <div
                      style={{
                        marginRight: 5,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: post.status === 1 ? "green" : "red",
                      }}
                    />
                    <h3
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {post?.title}
                    </h3>
                  </div>
                  <span>{post?.description}</span>
                  <div
                    className="post-info"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <div className="post-info-left flex">
                      {post.createdBy ? (
                        <div
                          className="flex"
                          style={{ marginRight: 12, alignItems: "center" }}
                        >
                          <Tag color="var(--theme-primary)">
                            {post.createdBy}
                          </Tag>
                          <span style={{ color: "var(--theme-primary)" }}>
                            {toLocalDate(post.createdAt)}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {post.updatedBy ? (
                        <div
                          className="flex"
                          style={{ marginRight: 12, alignItems: "center" }}
                        >
                          <Tag color="#008000">{post.updatedBy}</Tag>
                          <span style={{ color: "#008000" }}>
                            {toLocalDate(post.updatedAt)}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="post-info-right flex">
                      <Space size="middle">
                        <FuncTable
                          title="edit"
                          //onClick={() => showModalUpdatePost(post, refetch)}
                        />
                        <Popconfirm
                          title="Are you sure to delete this category?"
                          description={`Delete the [ ${post.title.slice(
                            0,
                            50
                          )}... ]`}
                          placement="leftTop"
                          onConfirm={() => onDeletePost(post.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <FuncTable
                            icon="fa-solid fa-trash-can"
                            title="delete"
                          />
                        </Popconfirm>
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
      <UpdatePostModal open={open} refetch={refetch} />
    </div>
  );
};
