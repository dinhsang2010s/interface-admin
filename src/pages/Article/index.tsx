import "./style.less";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Empty,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tooltip,
  message,
} from "antd";
import { LoadingOutlined, UngroupOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useDeleteArticle, useGetArticles } from "../../api/article";
import useComputeHeight from "../../hooks/useHeight";
import { toLocalDate } from "../../utils/dateTime";
import { FuncTable } from "../../components/FuncTable";
import { useUpdate } from "./useUpdate";
import { toUpperCaseFirst } from "../../utils/string";
import { CategorySelector } from "../../components/CategorySelector";

export const Article = () => {
  const refHeight = useRef(null);
  const height = useComputeHeight(refHeight);
  const [articles, setArticles] = useState<IPagination<IArticle[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [element, show] = useUpdate();
  const [query, setQuery] = useState<QueryDto>({
    offset: 0,
    pageSize: 20,
    orderBy: "",
    q: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const refetch = (queryInput?: QueryDto) => {
    useGetArticles(queryInput ?? query)
      .then((res) => setArticles(res))
      .catch((err) => message.error(err?.message));
  };

  useEffect(() => {
    refetch();
  }, [query]);

  const onRefetch = () => {
    setLoading(true);
    setValue("");
    setCurrentPage(1);
    refetch({ offset: 0, pageSize: 20, orderBy: "", q: "" });
    setLoading(false);
  };

  const debouncedSearch = debounce((value) => {
    useGetArticles({ ...query, q: value })
      .then((res) => setArticles(res))
      .catch((err) => message.error(err?.message));
  }, 500);

  const onSearchArticle = (e: any) => {
    setValue(e.target.value);
    if (e.target.value) {
      setLoading(true);
      debouncedSearch(e.target.value);
    } else {
      setLoading(false);
      refetch();
    }
  };

  const onDeleteArticle = (id: string) => {
    useDeleteArticle(id)
      .then(() => onRefetch())
      .catch((err) => message.error(err));
  };

  const onChangeQuery = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setQuery({
      ...query,
      offset: pageSize * (page - 1),
      pageSize,
      orderBy: "",
      q: "",
    });
  };

  return (
    <div className="article">
      <div className="article-header">
        <div className="flex-center">
          <div style={{ marginRight: 12, fontWeight: 600 }}>
            Total : {articles?.total}
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
            onChange={onSearchArticle}
            style={{ width: 250, marginRight: 12 }}
            placeholder="Search to article..."
            suffix={
              loading ? (
                <LoadingOutlined spin />
              ) : (
                <i className="fa fa-search"></i>
              )
            }
          />
          <div className="flex-center">
            <Form title="Filter" layout="inline">
              <Form.Item label="" name="categoryId">
                <CategorySelector width={200} />
              </Form.Item>
            </Form>
          </div>
        </div>
        <Button
          type="primary"
          icon={<i className="fa-solid fa-plus"></i>}
          onClick={() => show(refetch)}
        >
          Add
        </Button>
      </div>
      <div
        className="article-list"
        ref={refHeight}
        style={{ overflow: "auto", height: height - 70 }}
      >
        {articles?.data && articles.data.length > 0 ? (
          <ul>
            {articles?.data?.map((article) => (
              <li key={article.id} className="article-item">
                <div style={{ display: "flex" }}>
                  <div
                    className="image-topic"
                    style={{
                      flexShrink: 1,
                      width: 85,
                      minWidth: 85,
                      height: 70,
                      backgroundImage: `url(${article.imageTopic})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: 2,
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
                        marginBottom: 8,
                      }}
                    >
                      <Tag color="#db5cb5">
                        {toUpperCaseFirst(article.categoryName)}
                      </Tag>
                      <div
                        style={{
                          marginRight: 5,
                          width: 10,
                          minWidth: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: article.status === 1 ? "green" : "red",
                        }}
                      />
                      <h5
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {toUpperCaseFirst(article.title)}
                      </h5>
                    </div>
                    <span style={{ color: "#989393", fontSize: 12 }}>
                      {article.description
                        ? toUpperCaseFirst(article.description)
                        : "No description..."}
                    </span>
                    <div
                      className="article-info"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      {article.createdBy ? (
                        <div
                          className="flex"
                          style={{ marginRight: 12, alignItems: "center" }}
                        >
                          <h5 style={{ marginRight: 5 }}>CreatedBy : </h5>
                          <Tag color="var(--theme-primary)">
                            {article.createdBy}
                          </Tag>
                          <span style={{ color: "var(--theme-primary)" }}>
                            {toLocalDate(article.createdAt)}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {article.updatedBy ? (
                        <div
                          className="flex"
                          style={{ marginRight: 12, alignItems: "center" }}
                        >
                          <h5 style={{ marginRight: 5 }}>UpdatedBy : </h5>
                          <Tag color="#008000">{article.updatedBy}</Tag>
                          <span style={{ color: "#008000" }}>
                            {toLocalDate(article.updatedAt)}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      paddingLeft: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div className="edit-content" style={{ flexGrow: 1 }}>
                      <Tooltip title="View Article">
                        <Button
                          style={{ fontSize: 12 }}
                          icon={<UngroupOutlined />}
                        />
                      </Tooltip>
                    </div>
                    <Space style={{ flexGrow: 0 }} size="middle">
                      <FuncTable
                        title="edit"
                        onClick={() => show(refetch, article)}
                      />
                      <Popconfirm
                        title="Are you sure to delete this category?"
                        description={`Delete the [ ${article.title.slice(
                          0,
                          50
                        )}... ]`}
                        placement="leftTop"
                        onConfirm={() => onDeleteArticle(article.id)}
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
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty />
          </div>
        )}
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
          total={articles?.total}
          pageSize={20}
          showSizeChanger={true}
          current={currentPage}
          pageSizeOptions={["20", "50", "100"]}
          onChange={onChangeQuery}
        />
      </div>
      {element}
    </div>
  );
};
